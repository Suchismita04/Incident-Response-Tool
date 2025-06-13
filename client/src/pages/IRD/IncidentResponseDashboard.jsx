import React from "react";
import RealTimeAlertFeed from "./RealTimeAlertFeed";
import LogConsole from "./LogConsole";
import ResponseActionsPanel from "./ResponseActionsPanel";
import ThreatInteligence from "./ThreatInteligence";
import Alart from "./Alarts";
import { Button } from "../../components/ui/Button";


const IncidentResponseDashboard = () => {
  return (
    <>

      <div className="flex w-auto bg-gray-700 flex-col h-screen">
        <RealTimeAlertFeed />
        <LogConsole />
        <div className="w-64 h-64 fixed gap-6 flex h-screen p-2 flex-col right-5 top-5">
          <ThreatInteligence />
          <ResponseActionsPanel />
        </div>
        <Alart />
        <div className="fixed top-200 left-0 right-0 flex justify-center">
          <Button className="bg-red-500 text-white w-40">
            End Simulation
          </Button>
        </div>
      </div>
    </>
  )
}

export default IncidentResponseDashboard;