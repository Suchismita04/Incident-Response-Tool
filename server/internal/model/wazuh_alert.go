package model

type WazuhAlert struct {
	ID        string `json:"_id"`
	Timestamp string `json:"timestamp"`
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
