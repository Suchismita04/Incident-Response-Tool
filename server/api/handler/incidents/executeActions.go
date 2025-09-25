package incidents

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/internal/util"
)

func ExecuteActions(w http.ResponseWriter, r *http.Request) {
	type ActionRequest struct {
		IP      string   `json:"ip"`
		PID     int      `json:"pid"`
		Actions []string `json:"actions"`
	}

	fmt.Print("data from frontend:", r.Body)
	var req ActionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	results := make(map[string]string)

	for _, action := range req.Actions {
		switch action {
		case "Block Ip":
			err := util.BlockIncidentIp(req.IP)
			if err != nil {
				results[action] = err.Error()
			} else {
				results[action] = "Success"
			}
		case "Kill Process":
			err := util.KillProcess(req.PID)
			if err != nil {
				results[action] = err.Error()
			} else {
				results[action] = "Success"
			}
		case "Isolate Host":
			err := util.IsolateHost()
			if err != nil {
				results[action] = err.Error()
			} else {
				results[action] = "Success"
			}
		}
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"results": results,
	})
}
