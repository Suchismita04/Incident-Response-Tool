package incidents

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"server/internal/util"
	"time"
)

// ExecuteActions handles actions like Block IP, Kill Process, etc.
func ExecuteActions(w http.ResponseWriter, r *http.Request) {
	type ActionRequest struct {
		IP        string   `json:"ip"`
		Timestamp string   `json:"timestamp"`
		PID       int      `json:"pid"`
		Actions   []string `json:"actions"`
		AlertID   string   `json:"alert_id"`
	}

	var req ActionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// ✅ Convert timestamp to index format (Wazuh uses YYYY.MM.DD)
	// Example: "2025-10-10" -> "wazuh-alerts-4.x-2025.10.10"
	date := req.Timestamp[:10]
	index := fmt.Sprintf("wazuh-alerts-4.x-%s", formatDateForES(date))

	fmt.Println("Received request:", req)

	results := make(map[string]string)

	// ✅ Execute requested actions
	for _, action := range req.Actions {
		switch action {
		case "Block Ip":
			if err := util.BlockIncidentIp(req.IP); err != nil {
				results[action] = err.Error()
			} else {
				results[action] = "Success"
			}

		case "Kill Process":
			if err := util.KillProcess(req.PID); err != nil {
				results[action] = err.Error()
			} else {
				results[action] = "Success"
			}

		case "Isolate Host":
			if err := util.IsolateHost(); err != nil {
				results[action] = err.Error()
			} else {
				results[action] = "Success"
			}
		}
	}

	// ✅ Update alert status in Elasticsearch asynchronously
	if req.AlertID != "" && index != "" {
		go func() {
			err := MarkAlertResolved(index, req.AlertID, req.Actions)
			if err != nil {
				fmt.Println("Error updating alert status in ES:", err)
			} else {
				fmt.Printf("Alert %s marked as resolved in index %s\n", req.AlertID, index)
			}
		}()
	}

	// ✅ Respond to frontend
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(map[string]any{
		"results": results,
	})
}

// MarkAlertResolved updates an alert in Elasticsearch with "resolved" status
func MarkAlertResolved(index, alertID string, actions []string) error {
	api := os.Getenv("ELASTIC_API") // Example: "10.117.68.3:9200"
	// url := fmt.Sprintf("http://%s/%s/_update/%s", api, index, alertID)
	url := fmt.Sprintf("https://%s/%s/_doc/%s/_update", api, index, alertID)

	body := map[string]any{
		"doc": map[string]any{
			"status":        "resolved",
			"action_taken":  actions,
			"resolved_time": time.Now(),
		},
	}

	jsonBody, _ := json.Marshal(body)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("request failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Elasticsearch update failed: %s", resp.Status)

	}

	return nil
}

// formatDateForES converts "YYYY-MM-DD" → "YYYY.MM.DD" for ES index names
func formatDateForES(date string) string {
	return fmt.Sprintf("%s.%s.%s", date[0:4], date[5:7], date[8:10])
}
