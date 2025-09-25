import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

const Incidents = () => {

    const { incidentList, error } = useContext(DataContext)
    const navigate = useNavigate()
    console.log("data from home",incidentList)


  
    const handelNavigate = (id) => {
        navigate(`/investigate/${id}`)
    }
    console.log("data:", incidentList)
    if (incidentList.length === 0) {
        return "There is no incidents"
    }

    if (error) {
        return 404
    }
    return (



        <>


            {/* <div className="text-lg font-medium m-4 p-4 "> Live Incidents</div> */}
            <div >

                {

                    incidentList.map((incident, idx) => {

                        return (
                            <div key={idx} className="relative bg-slate-900 flex justify-center items-center border border-black font-large overflow-x-auto shadow-md sm:rounded-lg flex p-8 m-8 gap-8">

                                <p className="ml-4 mr-4 p-2 text-white text-lg">{incident['@timestamp']}</p>
                                <p className="ml-4 mr-4 p-2 text-white text-lg">{incident.agent?.ip || "Null"}</p>
                                <p className="ml-4 mr-4 p-2 text-white text-lg">{incident.alerts[0].rule.description}</p>
                                <p className="ml-4 mr-4 p-2 text-white text-lg">{incident.alerts[0].agent.name}</p>
                                <span className={`inline-flex items-center rounded-md bg-gray-50 px-2 py-1  text-green-700 ring-1 ring-green-600/20 ring-inset`}>{Math.max(...incident.alerts.map(element=>element.rule.level))}</span>

                                <button className=" bg-gradient-to-r from-purple-500 to-blue-600 bg-indigo-700 text-white font-bold py-2 px-4 rounded-full text-sm " onClick={() => { handelNavigate(incident.alerts[0]._id) }}>Investigate</button>
                            </div>

                        )
                    })
                }

            </div>


        </>
    )
}
export default Incidents 