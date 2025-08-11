
import Incidents from "./Incidents";
import Card from "../../components/Card";
import { useContext } from "react";
import DataContext from "../../context/DataContext";


const Dashboard = () => {
  
const {incidentList,error}=useContext(DataContext)

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
      <Incidents  />

    </>
  )
}
export default Dashboard 