import React from "react";
import {useNavigate} from "react-router-dom";

const Incidents = ({ incidentList }) => {
  
    const navigate= useNavigate()

    const handelNavigate=()=>{
    navigate("/investigate")
    }

    return (



        <>


            {/* <div className="text-lg font-medium m-4 p-4 "> Live Incidents</div> */}
            <div >

                {

                    incidentList.map((incident, idx) => {
                        return (
                            <div key={idx} className="relative flex justify-center items-center border border-black font-large overflow-x-auto shadow-md sm:rounded-lg flex p-8 m-8 gap-8">

                                <p className="ml-4 mr-4 p-2 text-lg">{incident['@timestamp']}</p>
                                <p className="ml-4 mr-4 p-2 text-lg">{incident.agent.ip}</p>
                                <p className="ml-4 mr-4 p-2 text-lg">{incident.rule.description}</p>
                                <p className="ml-4 mr-4 p-2 text-lg">{incident.agent.name}</p>
                                <span className={`inline-flex items-center rounded-md bg-gray-50 px-2 py-1  text-green-700 ring-1 ring-green-600/20 ring-inset`}>{incident.rule.level}</span>

                                <button className="text-white bg-blue-700 rounded-sm p-2" onClick={handelNavigate}>Investigate</button>
                            </div>

                        )
                    })
                }

            </div>


        </>
    )
}
export default Incidents 