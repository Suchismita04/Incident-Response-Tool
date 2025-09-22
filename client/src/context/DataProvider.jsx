import DataContext from "./DataContext"
import { useState,useEffect } from "react"
import axios from "axios"




const DataProvider=({children})=>{
    const [incidentList, setincidentList] = useState([])
  const [error, setError] = useState("")


  const fetchIncidents = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/getIncident")
        // console.log("res from golang backend", res.data)
      // console.log("res from golang backend", res.data.incidents)
      if (res.data.incidents) {
        setincidentList(res.data.incidents)
      }

    } catch (error) {
      // console.log("Error from backend", error)
      setError(error)
    }

  }

  useEffect(() => { fetchIncidents() }, [])


  return (
    <DataContext.Provider value={{incidentList,error}} >{children}</DataContext.Provider>
  )
}

export default DataProvider