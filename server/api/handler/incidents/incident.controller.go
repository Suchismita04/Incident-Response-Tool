package incidents

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"os"
	"server/internal/model"
	"server/internal/util"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

// OpenSearchSearchResponse represents the top-level structure of the OpenSearch/Elasticsearch search API response.
type OpenSearchSearchResponse struct {
	Took     int  `json:"took"`
	TimedOut bool `json:"timed_out"`
	Shards   struct {
		Total      int `json:"total"`
		Successful int `json:"successful"`
		Skipped    int `json:"skipped"`
		Failed     int `json:"failed"`
	} `json:"_shards"`
	Hits struct {
		Total struct {
			Value    int    `json:"value"`
			Relation string `json:"relation"`
		} `json:"total"`
		MaxScore interface{} `json:"max_score"`
		Hits     []struct {
			Index  string          `json:"_index"`
			ID     string          `json:"_id"`
			Score  interface{}     `json:"_score"`
			Source json.RawMessage `json:"_source"`
		} `json:"hits"`
	} `json:"hits"`
}

type WazuhAlert struct {
	ID        string `json:"_id"`
	Timestamp string `json:"@timestamp"`
	Rule      struct {
		ID          string `json:"id"`
		Level       int    `json:"level"`
		Description string `json:"description"`
	} `json:"rule"`
	Agent struct {
		ID   string `json:"id"`
		Name string `json:"name"`
		IP   string `json:"ip"`
	} `json:"agent"`
	FullLog string `json:"full_log"`
}

var now = time.Now().UTC()
var start = now.Truncate(24 * time.Hour).Format("2006-01-02T15:04:05.000Z")
var end = now.Truncate(24 * time.Hour).Add(24*time.Hour - time.Millisecond).Format("2006-01-02T15:04:05.000Z")

// GetIncidents fetches the latest incidents directly from the Wazuh Indexer.
func GetIncidents(w http.ResponseWriter, r *http.Request) {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	user := os.Getenv("WAZUH_USER")
	pass := os.Getenv("WAZUH_PASS")
	api := os.Getenv("WAZUH_API")
	baseURL := fmt.Sprintf("https://%s", api)

	url := baseURL + "/wazuh-alerts-*/_search"

	/**
	  @define search quary
	  **/
	searchQuary := map[string]any{
		"sort": []map[string]any{
			{
				"@timestamp": map[string]string{
					"order": "desc",
				},
			},
		},
		"size": 20,
		"query": map[string]any{
			"range": map[string]any{

				"@timestamp": map[string]any{
					"gte": start,
					"lte": end,
				},
			},
		},
	}

	/**
		  @ convert the search quary in json body
	**/
	quarybody, err := json.Marshal(searchQuary)
	if err != nil {
		util.ThrowApiError("Failed to contact Wazuh", 500)
	}

	// make a http request to the wazuh server
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(quarybody))
	req.SetBasicAuth(user, pass)
	req.Header.Set("Content-Type", "application/json")

	// this will skip the browsers specific ssl error
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}

	/**
	@ It sends the request to Wazuh and gets a response
	*/
	client := &http.Client{Transport: tr}
	res, err := client.Do(req)

	if err != nil {
		util.ThrowApiError("Failed to contact Wazuh indexer:", 500)
	}

	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		responseBody, _ := io.ReadAll(res.Body)
		log.Printf("Wazuh Indexer returned non-OK status: %d - %s", res.StatusCode, string(responseBody))
		util.ThrowApiError(" Wazuh API indexer error:", res.StatusCode)
	}

	/**
	      @Read the entire response body from the Indexer
		**/

	responseBody, err := io.ReadAll(res.Body)
	if err != nil {
		util.ThrowApiError("Failed to read Indexer response", http.StatusInternalServerError)
	}

	var searchResp OpenSearchSearchResponse
	// Unmarshal the JSON response into the OpenSearchSearchResponse struct
	err = json.Unmarshal(responseBody, &searchResp)
	if err != nil {
		util.ThrowApiError("Failed to parse Indexer response", http.StatusInternalServerError)

	}

	var alerts []model.WazuhAlert

	for _, hit := range searchResp.Hits.Hits {
		var alert model.WazuhAlert

		alert.ID = hit.ID
		// Unmarshal the JSON response into the WazuhAlert struct
		err := json.Unmarshal(hit.Source, &alert)
		if err != nil {
			log.Printf("Failed to parse alert: %v", err)
			continue // skip the alert
		}
		alerts = append(alerts, alert)
	}

	// fmt.Print("Alerts:", alerts)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// alerts := []model.WazuhAlert{

	// 	{
	// 		ID:        "1",
	// 		Timestamp: "2025-08-25T10:00:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "1001",
	// 			Level:       5,
	// 			Description: "Multiple failed login attempts",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-01",
	// 			Name: "workstation-01",
	// 			IP:   "192.168.1.10",
	// 		},
	// 		FullLog: "Failed login attempt from user root",
	// 	},
	// 	{
	// 		ID:        "2",
	// 		Timestamp: "2025-08-25T10:01:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "1002",
	// 			Level:       7,
	// 			Description: "Suspicious port scan detected",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-01",
	// 			Name: "workstation-01",
	// 			IP:   "192.168.1.10",
	// 		},
	// 		FullLog: "Nmap scan detected on ports 22, 80, 443",
	// 	},
	// 	{
	// 		ID:        "3",
	// 		Timestamp: "2025-08-25T10:02:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "1003",
	// 			Level:       3,
	// 			Description: "Unusual outbound traffic",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-01",
	// 			Name: "workstation-01",
	// 			IP:   "192.168.1.10",
	// 		},
	// 		FullLog: "Outbound connection to suspicious IP 8.8.8.8",
	// 	},

	// 	// Incident 2 → IP: 10.0.0.5 (3 alerts)
	// 	{
	// 		ID:        "4",
	// 		Timestamp: "2025-08-25T10:05:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "2001",
	// 			Level:       4,
	// 			Description: "New process created",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-02",
	// 			Name: "workstation-02",
	// 			IP:   "10.0.0.5",
	// 		},
	// 		FullLog: "Process explorer.exe started",
	// 	},
	// 	{
	// 		ID:        "5",
	// 		Timestamp: "2025-08-25T10:06:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "2002",
	// 			Level:       6,
	// 			Description: "Suspicious PowerShell execution",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-02",
	// 			Name: "workstation-02",
	// 			IP:   "10.0.0.5",
	// 		},
	// 		FullLog: "powershell.exe spawned from cmd.exe",
	// 	},
	// 	{
	// 		ID:        "6",
	// 		Timestamp: "2025-08-25T10:07:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "2003",
	// 			Level:       8,
	// 			Description: "Privilege escalation attempt",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-02",
	// 			Name: "workstation-02",
	// 			IP:   "10.0.0.5",
	// 		},
	// 		FullLog: "User tried to add themselves to Administrators group",
	// 	},

	// 	{
	// 		ID:        "7",
	// 		Timestamp: "2025-08-25T10:10:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "3001",
	// 			Level:       5,
	// 			Description: "Malware detected",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-03",
	// 			Name: "server-01",
	// 			IP:   "172.16.0.25",
	// 		},
	// 		FullLog: "Antivirus detected Trojan.Generic",
	// 	},
	// 	{
	// 		ID:        "8",
	// 		Timestamp: "2025-08-25T10:11:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "3002",
	// 			Level:       7,
	// 			Description: "Suspicious registry modification",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-03",
	// 			Name: "server-01",
	// 			IP:   "172.16.0.25",
	// 		},
	// 		FullLog: "Registry key HKLM\\Software\\Run modified",
	// 	},
	// 	{
	// 		ID:        "9",
	// 		Timestamp: "2025-08-25T10:12:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "3003",
	// 			Level:       6,
	// 			Description: "Suspicious outbound traffic",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-03",
	// 			Name: "server-01",
	// 			IP:   "172.16.0.25",
	// 		},
	// 		FullLog: "Connection to blacklisted IP 45.33.32.156",
	// 	},

	// 	{
	// 		ID:        "10",
	// 		Timestamp: "2025-08-25T10:15:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "4001",
	// 			Level:       4,
	// 			Description: "Unauthorized file access",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-04",
	// 			Name: "workstation-03",
	// 			IP:   "192.168.2.15",
	// 		},
	// 		FullLog: "User tried accessing restricted document",
	// 	},
	// 	{
	// 		ID:        "11",
	// 		Timestamp: "2025-08-25T10:16:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "4002",
	// 			Level:       5,
	// 			Description: "Unusual login location",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-04",
	// 			Name: "workstation-03",
	// 			IP:   "192.168.2.15",
	// 		},
	// 		FullLog: "User logged in from unknown country",
	// 	},
	// 	{
	// 		ID:        "12",
	// 		Timestamp: "2025-08-25T10:17:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "4003",
	// 			Level:       6,
	// 			Description: "Multiple account lockouts",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-04",
	// 			Name: "workstation-03",
	// 			IP:   "192.168.2.15",
	// 		},
	// 		FullLog: "Several users locked out due to failed logins",
	// 	},
	// }

	// correlation rule(alerts)

	response := util.CorrelationRule(alerts)

	// fmt.Print("filtered incident:", response)

	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		util.ThrowApiError("Failed to encode response", http.StatusInternalServerError)
	}

}

func GetSingleIncidents(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	if id == "" {
		util.ThrowApiError("Id not found", http.StatusNotFound)
		return
	}

	if err := godotenv.Load(); err != nil {
		log.Fatal("Failed to load .env file")
	}

	user := os.Getenv("WAZUH_USER")
	pass := os.Getenv("WAZUH_PASS")
	api := os.Getenv("WAZUH_API")
	baseUrl := fmt.Sprintf("https://%s", api)

	// Search API instead of direct _doc GET
	url := fmt.Sprintf("%s/wazuh-alerts-*/_search", baseUrl)

	// Query for the document by _id
	searchQuery := map[string]any{
		"query": map[string]any{
			"term": map[string]any{
				"_id": id,
			},
		},
	}

	payload, _ := json.Marshal(searchQuery)

	req, _ := http.NewRequest("POST", url, bytes.NewReader(payload))
	req.SetBasicAuth(user, pass)
	req.Header.Set("Content-Type", "application/json")

	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true}, // for self-signed certs
	}
	client := &http.Client{Transport: tr}

	res, err := client.Do(req)
	if err != nil {
		util.ThrowApiError("Failed to contact Wazuh indexer", http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		responseBody, _ := io.ReadAll(res.Body)
		log.Printf("Wazuh Indexer returned non-OK status: %d - %s", res.StatusCode, string(responseBody))
		util.ThrowApiError("Wazuh API indexer error", res.StatusCode)
		return
	}

	responseBody, err := io.ReadAll(res.Body)
	if err != nil {
		util.ThrowApiError("Failed to read Indexer response", http.StatusInternalServerError)
		return
	}

	// Struct for parsing ES search response
	var searchResp struct {
		Hits struct {
			Hits []struct {
				ID     string     `json:"_id"`
				Source WazuhAlert `json:"_source"`
			} `json:"hits"`
		} `json:"hits"`
	}

	err = json.Unmarshal(responseBody, &searchResp)
	if err != nil {
		util.ThrowApiError("Failed to parse Indexer response", http.StatusInternalServerError)
		return
	}

	if len(searchResp.Hits.Hits) == 0 {
		util.ThrowApiError("Incident not found", http.StatusNotFound)
		return
	}

	// Extract the alert
	alert := searchResp.Hits.Hits[0].Source
	alert.ID = searchResp.Hits.Hits[0].ID

	// alerts := []model.WazuhAlert{

	// 	{
	// 		ID:        "1",
	// 		Timestamp: "2025-08-25T10:00:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "1001",
	// 			Level:       5,
	// 			Description: "Multiple failed login attempts",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-01",
	// 			Name: "workstation-01",
	// 			IP:   "192.168.1.10",
	// 		},
	// 		FullLog: "Failed login attempt from user root",
	// 	},
	// 	{
	// 		ID:        "2",
	// 		Timestamp: "2025-08-25T10:01:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "1002",
	// 			Level:       7,
	// 			Description: "Suspicious port scan detected",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-01",
	// 			Name: "workstation-01",
	// 			IP:   "192.168.1.10",
	// 		},
	// 		FullLog: "Nmap scan detected on ports 22, 80, 443",
	// 	},
	// 	{
	// 		ID:        "3",
	// 		Timestamp: "2025-08-25T10:02:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "1003",
	// 			Level:       3,
	// 			Description: "Unusual outbound traffic",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-01",
	// 			Name: "workstation-01",
	// 			IP:   "192.168.1.10",
	// 		},
	// 		FullLog: "Outbound connection to suspicious IP 8.8.8.8",
	// 	},

	// 	// Incident 2 → IP: 10.0.0.5 (3 alerts)
	// 	{
	// 		ID:        "4",
	// 		Timestamp: "2025-08-25T10:05:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "2001",
	// 			Level:       4,
	// 			Description: "New process created",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-02",
	// 			Name: "workstation-02",
	// 			IP:   "10.0.0.5",
	// 		},
	// 		FullLog: "Process explorer.exe started",
	// 	},
	// 	{
	// 		ID:        "5",
	// 		Timestamp: "2025-08-25T10:06:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "2002",
	// 			Level:       6,
	// 			Description: "Suspicious PowerShell execution",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-02",
	// 			Name: "workstation-02",
	// 			IP:   "10.0.0.5",
	// 		},
	// 		FullLog: "powershell.exe spawned from cmd.exe",
	// 	},
	// 	{
	// 		ID:        "6",
	// 		Timestamp: "2025-08-25T10:07:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "2003",
	// 			Level:       8,
	// 			Description: "Privilege escalation attempt",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-02",
	// 			Name: "workstation-02",
	// 			IP:   "10.0.0.5",
	// 		},
	// 		FullLog: "User tried to add themselves to Administrators group",
	// 	},

	// 	{
	// 		ID:        "7",
	// 		Timestamp: "2025-08-25T10:10:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "3001",
	// 			Level:       5,
	// 			Description: "Malware detected",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-03",
	// 			Name: "server-01",
	// 			IP:   "172.16.0.25",
	// 		},
	// 		FullLog: "Antivirus detected Trojan.Generic",
	// 	},
	// 	{
	// 		ID:        "8",
	// 		Timestamp: "2025-08-25T10:11:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "3002",
	// 			Level:       7,
	// 			Description: "Suspicious registry modification",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-03",
	// 			Name: "server-01",
	// 			IP:   "172.16.0.25",
	// 		},
	// 		FullLog: "Registry key HKLM\\Software\\Run modified",
	// 	},
	// 	{
	// 		ID:        "9",
	// 		Timestamp: "2025-08-25T10:12:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "3003",
	// 			Level:       6,
	// 			Description: "Suspicious outbound traffic",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-03",
	// 			Name: "server-01",
	// 			IP:   "172.16.0.25",
	// 		},
	// 		FullLog: "Connection to blacklisted IP 45.33.32.156",
	// 	},

	// 	{
	// 		ID:        "10",
	// 		Timestamp: "2025-08-25T10:15:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "4001",
	// 			Level:       4,
	// 			Description: "Unauthorized file access",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-04",
	// 			Name: "workstation-03",
	// 			IP:   "192.168.2.15",
	// 		},
	// 		FullLog: "User tried accessing restricted document",
	// 	},
	// 	{
	// 		ID:        "11",
	// 		Timestamp: "2025-08-25T10:16:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "4002",
	// 			Level:       5,
	// 			Description: "Unusual login location",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-04",
	// 			Name: "workstation-03",
	// 			IP:   "192.168.2.15",
	// 		},
	// 		FullLog: "User logged in from unknown country",
	// 	},
	// 	{
	// 		ID:        "12",
	// 		Timestamp: "2025-08-25T10:17:00Z",
	// 		Rule: struct {
	// 			ID          string `json:"id"`
	// 			Level       int    `json:"level"`
	// 			Description string `json:"description"`
	// 		}{
	// 			ID:          "4003",
	// 			Level:       6,
	// 			Description: "Multiple account lockouts",
	// 		},
	// 		Agent: struct {
	// 			ID   string `json:"id"`
	// 			Name string `json:"name"`
	// 			IP   string `json:"ip"`
	// 		}{
	// 			ID:   "agent-04",
	// 			Name: "workstation-03",
	// 			IP:   "192.168.2.15",
	// 		},
	// 		FullLog: "Several users locked out due to failed logins",
	// 	},
	// }

	// var foundAlerts *model.WazuhAlert

	// for _, a := range alerts {
	// 	if a.ID == id {
	// 		foundAlerts = &a
	// 		break
	// 	}
	// }

	// if foundAlerts == nil {
	// 	util.ThrowApiError("Incident not found", http.StatusNotFound)
	// 	return
	// }
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(alert); err != nil {
		util.ThrowApiError("Failed to encode response", http.StatusInternalServerError)
	}
}
