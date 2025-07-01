package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", serverHandler).Methods("GET")
	log.Println("Starting server on :4000")
	log.Fatal(http.ListenAndServe(":4000", r))
}

func serverHandler(w http.ResponseWriter, r *http.Request) {
	w.Write(([]byte("<h1>server is running</h1>")))
}
