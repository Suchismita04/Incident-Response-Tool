package incidents

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os/exec"
	"strconv"
	"strings"
)

//Block IP

func BlockIncidentIp(w http.ResponseWriter, r *http.Request) {
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		log.Printf("Error reading request body: %v", err)
		return
	}
	defer r.Body.Close()

	ip := strings.TrimSpace(string(bodyBytes))

	fmt.Print("ip address from fronted:", ip)

	if ip == "127.0.0.1" || ip == "0.0.0.0" || ip == "::1" {
		fmt.Printf("Refusing to block system/localhost IP: %s", ip)
		return
	}

	//build rule command
	cmd := exec.Command("powershell", "New-NetFirewallRule",
		"-DisplayName", "BlockIP_"+ip,
		"-Direction", "Inbound",
		"-RemoteAddress", ip,
		"-Action", "Block")

	if err := cmd.Run(); err != nil {
		log.Printf("Failed to block IP %s: %v", ip, err)
		http.Error(w, "Failed to block IP", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Successfully blocked IP: %s", ip)

}

// disable user

func DisableUser(w http.ResponseWriter, r *http.Request) {

}

//kill process

func KillProcess(w http.ResponseWriter, r *http.Request) {
	bodyBytes, error := io.ReadAll(r.Body)

	pIDStr := strings.TrimSpace(string(bodyBytes))

	pID, err := strconv.Atoi(pIDStr)
	if err != nil {
		fmt.Println("Invalid process ID:", err)
		return
	}

	fmt.Print("P id from frontend:", pID)

	if error != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		log.Printf("Error reading request body: %v", err)
		return
	}
	defer r.Body.Close()

	if pID <= 100 {
		fmt.Printf("refusing kill the system process id:%d", pID)
	}

	cmd := exec.Command("taskKill", "/PID", strconv.Itoa(pID), "/F")

	err = cmd.Run()
	if err != nil {
		fmt.Printf("Can not kill the process:%d", pID)
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Successfully kill the process: %s", pIDStr)

}
