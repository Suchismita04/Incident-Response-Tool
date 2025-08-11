package incidents

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"server/internal/util"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

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
		MaxScore interface{} `json:"max_score"` // Can be float64 or null
		Hits     []struct {
			Index  string          `json:"_index"`
			ID     string          `json:"_id"`
			Score  interface{}     `json:"_score"`  // Can be float64 or null
			Source json.RawMessage `json:"_source"` // Raw JSON for the actual alert document
		} `json:"hits"`
	} `json:"hits"`
}

// WazuhAlert represents a simplified structure for a Wazuh alert/incident,
// extracted from the '_source' field of an OpenSearch hit.
type WazuhAlert struct {
	ID        string `json:"_id"` // Add this to store the _id from the hit
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

// return all incident
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
			"match_all": map[string]any{},
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

	var alerts []WazuhAlert

	for _, hit := range searchResp.Hits.Hits {
		var alert WazuhAlert

		alert.ID = hit.ID
		// Unmarshal the JSON response into the WazuhAlert struct
		err := json.Unmarshal(hit.Source, &alert)
		if err != nil {
			log.Printf("Failed to parse alert: %v", err)
			continue // skip the alert
		}
		alerts = append(alerts, alert)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	err = json.NewEncoder(w).Encode(alerts)
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

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(alert); err != nil {
		util.ThrowApiError("Failed to encode response", http.StatusInternalServerError)
	}
}
