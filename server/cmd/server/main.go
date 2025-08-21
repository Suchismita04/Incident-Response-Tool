package main

import (
	"fmt"
	"log"
	"net/http"
	incidentRouter "server/api/router/incidents"
	userRouter "server/api/router/user"

	"server/internal/config"

	"github.com/gorilla/mux"
)

func main() {
	db := config.ConnectDB()
	fmt.Println("Users Collection:", db.Name())
	// defer db.Disconnect(nil)
	r := mux.NewRouter()

	// routers
	incidentRouter.RegisterIncidentRouter(r)
	userRouter.RegisterUserRouter(r)

	log.Println("Starting server on :4000")
	log.Fatal(http.ListenAndServe(":4000", r))
}
