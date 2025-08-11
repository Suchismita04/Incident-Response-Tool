package router

import (
	"server/api/handler/incidents"

	"github.com/gorilla/mux"
)

func RegisterIncidentRouter() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/api/getIncident", incidents.GetIncidents).Methods("POST")
	r.HandleFunc("/api/getSingleIncident/{id}", incidents.GetSingleIncidents).Methods("GET")
	return r
}
