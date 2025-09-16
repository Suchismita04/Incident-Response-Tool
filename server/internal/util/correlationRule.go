package util

import "server/internal/model"

func CorrelationRule(alerts []model.WazuhAlert) map[string]any {
	incidentMap := make(map[int][]model.WazuhAlert)
	incidentId := 1 // for dummy incidents
	for _, alert := range alerts {
		level := alert.Rule.Level

		if level == 0 {
			continue
		}
		incidentMap[level] = append(incidentMap[level], alert)
	}

	//correlation rule

	var correlatedIncidents []map[string]any

	for level, levelAlerts := range incidentMap {
		if (level >= 5 && len(levelAlerts) >= 1) || (level >= 7 && len(levelAlerts) >= 3) {
			correlatedIncidents = append(correlatedIncidents, map[string]any{
				"id":        incidentId,
				"rule_type": "Level-based correlation",
				"level":     level,
				"count":     len(levelAlerts),
				"alerts":    levelAlerts,
			})
			incidentId++
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
