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

  const [incidentData, setIncidentData] = useState([])
  const actions = ["Block Ip", "Isolate Host", "Kill Process", "Disable User"]

  const fetchSingleIncident = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/getSingleIncident/${id}`)
    console.log("res from backeend:", res)
    try {
      if (res.data) {
        console.log("res from backeend:", res.data)

        setIncidentData([res.data])
      }
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    fetchSingleIncident(id)

  }, [id])


  useEffect(() => {
    console.log(incidentData)
  }, [incidentData])

  return (
    <>

      <header className="bg-slate-900 bg-opacity-70 backdrop-blur-md border-b border-slate-700 py-4 px-6 flex justify-between items-center z-20">
        <div className="flex items-center">
          <h1 className="text-2xl font-extrabold text-indigo-400 mr-4">CyberShield</h1>
          <span className="text-slate-300 text-lg">Incident Detail: <span id="incident-id">INC-2025-001</span></span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-slate-400 hover:text-white transition duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span className="ml-1">Back to Dashboard</span>
          </button>
        </div>
      </header>


      <main className="bg-slate-600 flex-grow p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

        {incidentData.map((data, idx) => {
          return (
            <div key={idx} className="lg:col-span-2 space-y-6">

              <div className="bg-slate-800 bg-opacity-80 rounded-xl p-6 shadow-xl border border-slate-700 card-enter">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white" id="incident-title">{data.rule?.description || "Unknone Incident"}</h2>
                  <span id="incident-status" className="bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full">Investigating</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Severity:</p>
                    <span id="incident-severity" className="text-lg font-bold severity-critical px-3 py-1 rounded-md text-white">{data.rule?.level}</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Detected At:</p>
                    <p id="incident-detected-at" className="text-white font-medium">{new Date(data.timestamp).toISOString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Type:</p>
                    <p id="incident-type" className="text-white font-medium">{data.rule?.description || "Unknone Type"}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Affected Assets:</p>
                    <p id="incident-assets" className="text-white font-medium">{data.agent?.name},{data.agent?.ip}</p>
                  </div>
                </div>

                <h3 className="text-slate-300 font-semibold mb-2">Description:</h3>
                <p id="incident-description" className="text-slate-400 text-sm leading-relaxed">
                  {data.full_log || "No description available."}
                </p>
              </div>

              {/* will do it leter */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl p-6 shadow-xl border border-slate-700 card-enter" >
                <h3 className="text-lg font-semibold text-slate-300 mb-4">Incident Timeline</h3>
                <div id="incident-timeline" className="space-y-6 max-h-96 overflow-y-auto custom-scrollbar pr-2">


                  <div className="relative pl-6 pb-6 border-l-2 border-slate-700">
                    <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 top-0 border-2 border-slate-800"></div>
                    <p className="text-xs text-slate-500 mb-1">10:30 AM - Aug 12, 2025</p>
                    <p className="text-white font-medium">Automated Detection: Suspicious process activity on <span className="text-indigo-400">Server-03</span> flagged by EDR.</p>
                    <p className="text-sm text-slate-400">System generated alert.</p>
                  </div>

                  <div className="relative pl-6 pb-6 border-l-2 border-slate-700">
                    <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 top-0 border-2 border-slate-800"></div>
                    <p className="text-xs text-slate-500 mb-1">10:35 AM - Aug 12, 2025</p>
                    <p className="text-white font-medium">Incident Created: <span className="text-indigo-400">INC-2025-001</span> assigned to Team Sigma.</p>
                    <p className="text-sm text-slate-400">Auto-assigned via playbook.</p>
                  </div>

                  <div className="relative pl-6 pb-6 border-l-2 border-slate-700">
                    <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 top-0 border-2 border-slate-800"></div>
                    <p className="text-xs text-slate-500 mb-1">10:45 AM - Aug 12, 2025</p>
                    <p className="text-white font-medium">User Action: <span className="text-green-400">Sarah Lee</span> initiated network isolation for Server-03.</p>
                    <p className="text-sm text-slate-400">Manual action, verified by logs.</p>
                  </div>

                  <div className="relative pl-6 pb-6 border-l-2 border-slate-700">
                    <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 top-0 border-2 border-slate-800"></div>
                    <p className="text-xs text-slate-500 mb-1">11:00 AM - Aug 12, 2025</p>
                    <p className="text-white font-medium">Update: Initial forensic image of Server-03 acquired.</p>
                    <p className="text-sm text-slate-400">Note by <span className="text-blue-400">John Davis</span>.</p>
                  </div>
                </div>
              </div>
            </div>

          )
        })}



        {/* required actions */}

        <div className="lg:col-span-1 space-y-6">

          <div className="bg-slate-800 bg-opacity-80 rounded-xl p-6 shadow-xl border border-slate-700 card-enter" >
            <h3 className="text-lg font-semibold text-slate-300 mb-4">Required Actions</h3>
            <div id="actions-list" className="space-y-3">

              {actions.map((data, idx) => {
                return (
                  <div key={idx} className="flex items-start text-slate-300">
                    <input id="link-checkbox" type="checkbox" value="" className="w-4 m-2 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <span className="checkmark"></span>
                    <label className="">
                      {data}
                    </label>
                  </div>

                )
              })}

{/* threat  Intelligence Section */}

              <div className="mb-6">
                <label htmlFor="threatIntelligence" className="text-lg block text-white text-sm font-semibold mb-2">Threat Intelligence</label>
                <input type="text" className="bg-slate-900 text-white rounded-lg border border-slate-700 py-2 px-4 w-full" placeholder="Enter ip address, Hash...." />
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 bg-indigo-700 text-white font-bold py-2 px-4 rounded-full text-sm mt-6 transition duration-300 ease-in-out">
                  Add To Block List
                </button>
              </div>

            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 bg-indigo-700 text-white font-bold py-2 px-4 rounded-full text-sm mt-6 transition duration-300 ease-in-out">
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Mark as Complete
            </button>
          </div>

        </div>

      </main>




    </>
  );
};

export default IncidentResponseDashboard;
