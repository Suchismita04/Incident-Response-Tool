package router

import (
	"server/api/handler/user"

	"github.com/gorilla/mux"
)

func RegisterUserRouter(r *mux.Router) {
	userRouter := r.PathPrefix("/api/user").Subrouter()

	userRouter.HandleFunc("/register", user.RegisterUser).Methods("POST")

}
