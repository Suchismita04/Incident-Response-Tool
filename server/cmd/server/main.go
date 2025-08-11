package main

import (
	"log"
	"net/http"
	router "server/api/router/incidents"
)

func main() {
	r := router.RegisterIncidentRouter()

	log.Println("Starting server on :4000")
	log.Fatal(http.ListenAndServe(":4000", r))
}
