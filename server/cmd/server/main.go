package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	incidentRouter "server/api/router/incidents"
	userRouter "server/api/router/user"

	"server/internal/config"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	db := config.ConnectDB()
	fmt.Println("Users Collection:", db.Name())
	// defer cancel()
	// defer db.Disconnect()
	r := mux.NewRouter()

	// routers
	incidentRouter.RegisterIncidentRouter(r)
	incidentRouter.RegisterActionRouter(r)
	userRouter.RegisterUserRouter(r)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("CORS_ORIGIN")},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            true,
	})

	handler := c.Handler(r)
	log.Println("Starting server on :4000")
	log.Fatal(http.ListenAndServe(":4000", handler))
}
