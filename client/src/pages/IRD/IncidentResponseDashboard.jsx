import React from "react";
import RealTimeAlertFeed from "./RealTimeAlertFeed";
import LogConsole from "./LogConsole";
import ResponseActionsPanel from "./ResponseActionsPanel";
import ThreatInteligence from "./ThreatInteligence";
import Alart from "./Alarts";
import { Button } from "../../components/ui/Button";

const IncidentResponseDashboard = () => {
  return (
    <div className="  w-screen bg-gray-700 p-4 gap-4">
      
      {/* Left Section - RealTime Alerts and Logs */}
      <div className=" gap-4  overflow-y-auto">
        <RealTimeAlertFeed />
        <LogConsole />
        <Alart />
      </div>

      {/* Right Section - Intelligence & Actions */}
      <div className="flex flex-col gap-4 w-1/3">
        <ThreatInteligence />
        <ResponseActionsPanel />
        <div className="flex justify-center mt-auto">
          <Button className="bg-red-500 text-white w-40">
            End Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentResponseDashboard;
