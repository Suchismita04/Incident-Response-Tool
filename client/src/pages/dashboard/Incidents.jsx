import React from "react";

const Incidents = ({ incidentList }) => {
    // const incidentList = props 
    console.log(incidentList)
    console.log(typeof (incidentList))

    return (



        <>


            {/* <div className="text-lg font-medium m-4 p-4 "> Live Incidents</div> */}
            <div >

                {

                    incidentList.map((incident, idx) => {
                        return (
                            <div key={idx} className="relative flex justify-center items-center border border-black font-large overflow-x-auto shadow-md sm:rounded-lg flex p-8 m-8 gap-8">

                                <p className="ml-4 mr-4 p-2 text-lg">{incident.timestamp}</p>
                                <p className="ml-4 mr-4 p-2 text-lg">{incident.source_ip}</p><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                                <p className="ml-4 mr-4 p-2 text-lg">{incident.destination_ip}</p>
                                <p className="ml-4 mr-4 p-2 text-lg">{incident.alert_type}</p>
                                <span className={`inline-flex items-center rounded-md bg-gray-50 px-2 py-1  text-green-700 ring-1 ring-green-600/20 ring-inset`}>{incident.status}</span>

                                <button className="text-white bg-blue-700 rounded-sm p-2">Investigate</button>
                            </div>

                        )
                    })
                }

            </div>


        </>
    )
}
export default Incidents 