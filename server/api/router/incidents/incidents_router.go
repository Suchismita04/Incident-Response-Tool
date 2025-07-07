
package router
import(
	"github.com/gorilla/mux"
	"server/api/handler/incidents"
	
)

func RegisterIncidentRouter() *mux.Router{
	r := mux.NewRouter()
	
	r.HandleFunc("/api/getIncident", incidents.GetIncidents).Methods("POST")
   return r
}

