import Incidents from "./Incidents";
import Card from "../../components/Card";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import { Link } from 'react-router-dom'; 

// Helper function to calculate high-level alerts
// (Keeping the data logic separate from the presentation)
const calculateHighAlerts = (incidentList) => {
  if (!incidentList || incidentList.length === 0) return 0;

  let highAlertCount = 0;

  // Example logic: count incidents that have at least one alert with a level >= 10
  incidentList.forEach(incident => {
    const hasHighAlert = incident.alerts?.some(alert => alert.rule?.level >= 10);
    if (hasHighAlert) {
      highAlertCount++;
    }
  });

  return highAlertCount;
};

const Dashboard = () => {

  const { incidentList, error } = useContext(DataContext);

  
  const incidents = incidentList || [];

  
  const highAlertsCount = calculateHighAlerts(incidents);
  const totalIncidents = incidents.length;
  const activeAlerts = 24; // Placeholder
  const resolvedIncidents = 45; // Placeholder

  
  return (
    <>


      {/* Main Content Area - Deep Background */}
      <div className="bg-slate-600 flex-grow p-6 grid gap-6 relative z-10">
        {/* Data Cards Section */}
        {error && <p className="text-red-400 text-center py-4">Error fetching data: {error.message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card
            name="Total Incidents"
            totalNumber={totalIncidents}
            accentColor="text-indigo-400"
            cardBg="bg-slate-900 "
            borderColor="border-indigo-500/30"
          />
          <Card
            name="Active Alerts"
            totalNumber={activeAlerts}
            accentColor="text-orange-400"
            cardBg="bg-slate-900 "
            borderColor="border-orange-400/30"
          />
          <Card
            name="High Security Alert"
            totalNumber={highAlertsCount}
            accentColor="text-red-500"
            cardBg="bg-slate-900 "
            borderColor="border-red-500/30"
          />
          <Card
            name="Resolved Incidents"
            totalNumber={resolvedIncidents}
            accentColor="text-green-400"
            cardBg="bg-slate-900 "
            borderColor="border-green-400/30"
          />
        </div>

        {/* Incidents Table/List Section */}
        <div className="bg-slate-700 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white mb-6 border-b border-slate-700/50 pb-3">
            Real-time Incident Feed
          </h2>
          <Incidents />
        </div>


      </div>
    </>
  );
}

export default Dashboard;