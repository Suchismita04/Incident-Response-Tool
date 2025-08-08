import React from "react";
import RealTimeAlertFeed from "./RealTimeAlertFeed";
import LogConsole from "./LogConsole";
import ResponseActionsPanel from "./ResponseActionsPanel";
import ThreatInteligence from "./ThreatInteligence";
import Alart from "./Alarts";
import { Button } from "../../components/ui/Button";


const IncidentResponseDashboard = () => {

  

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
