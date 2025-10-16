package router

import (
	"net/http"
	"server/api/handler/incidents"
	"server/api/middleware"

	"github.com/gorilla/mux"
)

func RegisterActionRouter(r *mux.Router) {
	actionRouter := r.PathPrefix("/action").Subrouter()

	actionRouter.Handle("/execute", middleware.AuthMiddleware(http.HandlerFunc(incidents.ExecuteActions))).Methods("POST")

}
