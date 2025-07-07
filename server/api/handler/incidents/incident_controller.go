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
	user := os.Getenv("WAZUH_USER")
	pass := os.Getenv("WAZUH_PASS")
	api := os.Getenv("WAZUH_API")

	url := fmt.Sprintf("https://%s/alerts?limit=10", api)

	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// make a http request to the wazuh server
	req, _ := http.NewRequest("GET", url, nil) // will change later

	req.SetBasicAuth(user, pass)

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

	body, _ := io.ReadAll(res.Body)

	fmt.Print("body from get incident controller :\n", body)

	util.SetHeaders(w)
	json.NewEncoder(w).Encode(string(body))
}
