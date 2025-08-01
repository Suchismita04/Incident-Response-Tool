import React, { useEffect, useState } from "react";
import Incidents from "./Incidents";
import Card from "../../components/Card";
import axios from "axios"

const Dashboard = () => {
  const [incidentList, setincidentList] = useState([])
  const [error, setError] = useState("")


  const fetchIncidents = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/getIncident")
      console.log("res from golang backend", res.data)
      if (res.data) {
        setincidentList(res.data)
      }

    } catch (error) {
      console.log("Error from backend", error)
      setError(error)
    }

  }

  useEffect(() => { fetchIncidents() }, [])


  return (



    <>

      {/* // data will fetch from backend */}
      <div className="p-2 flex  gap-8 top-10 m-15 relative 
flex-wrap: wrap justify-center items-center">
        <Card name="Total Incidents" totalNumber={incidentList.length} />
        <Card name="Active Alerts" totalNumber={24} />
        <Card name="High security alart" totalNumber={incidentList.filter((incident,idx)=>incident.rule.leve>10).length} />
        <Card name="Resolve Incidents" totalNumber={45} />
      </div>
      <Incidents incidentList={incidentList} />

    </>
  )
}
export default Dashboard 