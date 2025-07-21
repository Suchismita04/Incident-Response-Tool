import React, { useEffect, useState } from "react";
import Incidents from "./incidents";
import Card from "../../components/Card";
import axios from "axios"

const Dashboard = () => {
  const [incidentList,setincidentList]=useState([])
  const [error,setError]=useState("")
  // const incidentList = [
  //   {
  //     "id": "INC-10231",
  //     "timestamp": "2025-06-06T21:18:34Z",
  //     "source_ip": "192.168.1.24",
  //     "destination_ip": "10.0.0.12",
  //     "alert_type": "Brute Force Attack",
  //     "severity": "High",
  //     "status": "New",
  //     "detected_by": "Wazuh",
  //     "location": "India",
  //     "hostname": "server-prod-1",
  //     "description": "Multiple failed SSH login attempts detected from external IP.",
  //     "actions": ["Investigate", "Block IP", "View Logs"]
  //   },
  //   {
  //     "id": "INC-10232",
  //     "timestamp": "2025-06-06T21:20:10Z",
  //     "source_ip": "203.0.113.42",
  //     "destination_ip": "10.0.0.25",
  //     "alert_type": "Port Scan",
  //     "severity": "Medium",
  //     "status": "Investigating",
  //     "detected_by": "ELK",
  //     "location": "USA",
  //     "hostname": "web-gateway",
  //     "description": "Detected nmap-style scan on multiple open ports.",
  //     "actions": ["Investigate", "Block IP", "View Logs"]
  //   },
  //   {
  //     "id": "INC-10233",
  //     "timestamp": "2025-06-06T21:22:11Z",
  //     "source_ip": "45.33.32.156",
  //     "destination_ip": "10.0.0.5",
  //     "alert_type": "Malware Activity",
  //     "severity": "Critical",
  //     "status": "New",
  //     "detected_by": "Wazuh",
  //     "location": "Germany",
  //     "hostname": "endpoint-12",
  //     "description": "Suspicious process spawned by PowerShell script.",
  //     "actions": ["Investigate", "Block IP", "View Logs"]
  //   }
  // ]


  const fetchIncidents= async()=>{
    try {
      const res =await axios.post("http://localhost:4000/api/getIncident")
      console.log("res from golang backend",res.data.data.affected_items)
      if (res.data.data.affected_items) {
        setincidentList(res.data.data.affected_items)
      }
      
    } catch (error) {
      console.log("Error from backend",error)
      setError(error)
    }

  }

  useEffect(()=>{fetchIncidents()},[])


  return (



    <>

      {/* // data will fetch from backend */}
      <div className="p-2 flex  gap-8 top-10 m-15 relative 
flex-wrap: wrap justify-center items-center">
        <Card name="Total Incidents" totalNumber={128} />
        <Card name="Active Alerts" totalNumber={24} />
        <Card name="High security alart" totalNumber={10} />
        <Card name="Resolve Incidents" totalNumber={45} />
      </div>

      <Incidents incidentList={incidentList} />

    </>
  )
}
export default Dashboard 