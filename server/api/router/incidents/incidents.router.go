package router

import (
	"server/api/handler/incidents"

	"github.com/gorilla/mux"
)

func RegisterIncidentRouter(r *mux.Router) {
	incidentRouter := r.PathPrefix("/api").Subrouter()
	incidentRouter.HandleFunc("/getIncident", incidents.GetIncidents).Methods("POST")
	incidentRouter.HandleFunc("/getSingleIncident/{id}", incidents.GetSingleIncidents).Methods("GET")

}
