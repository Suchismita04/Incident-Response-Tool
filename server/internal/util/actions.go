package util

import (
	"fmt"
	"os/exec"
	"strconv"
)

var SimulationMode = true

func BlockIncidentIp(ip string) error {
	if SimulationMode {
		fmt.Println("[SIMULATION] Block IP:", ip)
		return nil
	}

	cmd := exec.Command("powershell", "New-NetFirewallRule",
		"-DisplayName", "BlockIP_"+ip,
		"-Direction", "Inbound",
		"-RemoteAddress", ip,
		"-Action", "Block")

	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to block IP %s: %v", ip, err)
	}
	return nil
}

func KillProcess(pid int) error {
	if SimulationMode {
		fmt.Println("[SIMULATION] Kill Process:", pid)
		return nil
	}

	cmd := exec.Command("taskkill", "/PID", strconv.Itoa(pid), "/F")
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to kill process %d: %v", pid, err)
	}
	return nil
}

func IsolateHost() error {
	if SimulationMode {
		fmt.Println("[SIMULATION] Isolate Host")
		return nil
	}

	cmd := exec.Command("powershell", "Get-NetAdapter | Disable-NetAdapter -Confirm:$false")
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to isolate host: %v", err)
	}
	return nil
}
