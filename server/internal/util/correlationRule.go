package util

import "server/internal/model"

func CorrelationRule(alerts []model.WazuhAlert) map[string]any {
	incidentMap := make(map[string][]model.WazuhAlert)

	for _, alert := range alerts {
		ip := alert.Agent.IP

		if ip == "" {
			continue
		}
		incidentMap[ip] = append(incidentMap[ip], alert)
	}

	//correlation rule

	var correlatedIncidents []map[string]any

	for ip, ipAlerts := range incidentMap {
		if len(ipAlerts) >= 3 {
			correlatedIncidents = append(correlatedIncidents, map[string]any{
				"source_ip": ip,
				"count":     len(ipAlerts),
				"alerts":    ipAlerts,
			})
		}
	}

	response := map[string]any{
		"alerts":     alerts,
		"incidents":  correlatedIncidents,
		"total":      len(alerts),
		"correlated": len(correlatedIncidents),
	}

	return response
}
