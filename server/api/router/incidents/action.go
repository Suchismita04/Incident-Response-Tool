package router

import (
	"server/api/handler/incidents"

	"github.com/gorilla/mux"
)

func RegisterActionRouter(r *mux.Router) {
	actionRouter := r.PathPrefix("/action").Subrouter()

	actionRouter.HandleFunc("/execute", incidents.ExecuteActions).Methods("POST")

}
