import React, { useContext, useEffect, useState } from "react";
import RealTimeAlertFeed from "./RealTimeAlertFeed";
import LogConsole from "./LogConsole";
import ResponseActionsPanel from "./ResponseActionsPanel";
import ThreatInteligence from "./ThreatInteligence";
import Alart from "./Alarts";
import { Button } from "../../components/ui/Button";
import DataContext from "../../context/DataContext";
import { useParams } from "react-router-dom";
import axios from "axios";


const IncidentResponseDashboard = () => {

  const { id } = useParams()

  const [ incidentData, setIncidentData ] = useState(null)

  const fetchSingleIncident = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/getSingleIncident/${id}`)
    //  console.log("res from backeend:",res)
    try {
      if (res.data) {
        console.log("res from backeend:", res.data)
        setIncidentData(res.data)
      }
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    fetchSingleIncident(id)

  }, [id])


  useEffect(()=>{
    console.log(incidentData)
  },[incidentData])

  return (
    <div className="bg-gray-200 p-6">

      <div className=" flex justify-between gap-2">
        {/* left Section - Intelligence */}
        <div className="flex-1">
          <ThreatInteligence />
        </div>

        {/* middle Section - RealTime Alerts and Logs */}
        <div className="flex-1 flex-col  gap-2 mx-2">
          <RealTimeAlertFeed />
          <LogConsole />

        </div>

        <div className="flex flex-1">
          <Alart />
        </div>

        {/* Right Section - Actions */}
        <div className="flex-1 gap-4">

          <ResponseActionsPanel />
        </div>

      </div>
      <div className=" ">
        <Button className="bg-red-500 text-white w-40">
          End Simulation
        </Button>
      </div>

    </div>
  );
};

export default IncidentResponseDashboard;
