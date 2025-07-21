package incidents

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"server/internal/util"

	"github.com/joho/godotenv"
)

func GetIncidents(w http.ResponseWriter, r *http.Request) {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	user := os.Getenv("WAZUH_USER")
	pass := os.Getenv("WAZUH_PASS")
	api := os.Getenv("WAZUH_API")
	baseURL := fmt.Sprintf("https://%s", api)

	url := baseURL + "/security/user/authenticate"

	// make a http request to the wazuh server
	req, _ := http.NewRequest("POST", url, nil)
	req.SetBasicAuth(user, pass)
	req.Header.Set("Content-Type", "application/json")
	// fmt.Print("token from server\n", req)

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
		util.ThrowApiError("Failed to contact Wazuh", 500)
	}

	defer res.Body.Close()

	authbody, _ := io.ReadAll(res.Body)

	/**
	@ extract the token from res
	*/

	var authResp struct {
		Data struct {
			Token string `json:"token"`
		} `json:"data"`
	}
	if err := json.Unmarshal(authbody, &authResp); err != nil {
		util.ThrowApiError("Failed to parse auth token", 500)

	}

	token := authResp.Data.Token
	if token == "" {
		util.ThrowApiError("Token not found in response", 500)
	}

	agentUrl := baseURL + "/alerts"

	agentReq, err := http.NewRequest("GET", agentUrl, nil)
	if err != nil {
		util.ThrowApiError("Failed to create agents request", 500)

	}

	agentReq.Header.Set("Authorization", "Bearer "+token)
	agentReq.Header.Set("Content-Type", "application/json")

	agentRes, err := client.Do(agentReq)
	if err != nil {
		util.ThrowApiError("Failed to get agents from Wazuh", 500)

	}

	agentData, err := io.ReadAll(agentRes.Body)

	defer agentRes.Body.Close()
	if err != nil {
		util.ThrowApiError("Failed to read agents response", 500)

	}
	// fmt.Println("agentsRes is nil?", agentRes == nil)
	// fmt.Println("agentsRes.Body is nil?", agentRes != nil && agentRes.Body == nil)

	fmt.Print("data from agent:\n", string(agentData))
	util.SetHeaders(w)
	w.WriteHeader(agentRes.StatusCode)
	w.Write(agentData)
}
