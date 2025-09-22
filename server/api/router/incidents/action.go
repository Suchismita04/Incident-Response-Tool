package router

import (
	"server/api/handler/incidents"

	"github.com/gorilla/mux"
)

func RegisterActionRouter(r *mux.Router) {
	actionRouter := r.PathPrefix("/action").Subrouter()

	actionRouter.HandleFunc("/blockIncidentIp", incidents.BlockIncidentIp).Methods("POST")

	actionRouter.HandleFunc("/killProcess", incidents.KillProcess).Methods("POST")
	actionRouter.HandleFunc("/isolate-host", incidents.IsolateHostHandler).Methods("POST")

}
