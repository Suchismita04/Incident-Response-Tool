package router

import (
	"net/http"
	"server/api/handler/incidents"
	"server/api/middleware"

	"github.com/gorilla/mux"
)

func RegisterIncidentRouter(r *mux.Router) {
	incidentRouter := r.PathPrefix("/api").Subrouter()

	incidentRouter.Handle("/getIncident", middleware.AuthMiddleware(http.HandlerFunc(incidents.GetIncidents))).Methods("POST")
	incidentRouter.Handle("/getSingleIncident/{id}", middleware.AuthMiddleware(http.HandlerFunc(incidents.GetSingleIncidents))).Methods("GET")

}
