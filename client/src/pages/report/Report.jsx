



const Report = () => {
    return (
        <>



            <header className="bg-slate-900 bg-opacity-70 backdrop-blur-md border-b border-slate-700 py-4 px-6 flex justify-between items-center z-20">
                <div className="flex items-center">
                    <h1 className="text-2xl font-extrabold text-indigo-400 mr-4">CyberShield</h1>
                    <span className="text-slate-300 text-lg">Report Generation Console</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-slate-400 hover:text-white transition duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        <span className="ml-1">Back to Dashboard</span>
                    </button>
                </div>
            </header>


            <div className="bg-slate-600 flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">


                <div className="bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-xl border border-slate-700 card-enter">
                    <h2 className="text-2xl font-bold text-white mb-6">Configure Report Parameters</h2>

                    <div className="space-y-6">

                        <div>
                            <label for="incident-select" className="block text-slate-300 text-sm font-semibold mb-2">Select Incident(s)</label>
                            <select id="incident-select" className="input-field" multiple>
                                <option value="INC-2025-001">INC-2025-001: Malware Infection (Critical)</option>
                                <option value="INC-2025-002">INC-2025-002: Phishing Attempt (High)</option>
                                <option value="INC-2025-003">INC-2025-003: Unauthorized Access (Critical)</option>
                                <option value="SIM-2025-01-05">SIM-2025-01-05: APT Simulation (High)</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-1">Hold Ctrl/Cmd to select multiple incidents.</p>
                        </div>


                        <div>
                            <label for="report-type" className="block text-slate-300 text-sm font-semibold mb-2">Report Type / Template</label>
                            <select id="report-type" className="input-field">
                                <option value="summary">Executive Summary</option>
                                <option value="detailed">Detailed Incident Analysis</option>
                                <option value="forensic">Forensic Analysis Report</option>
                                <option value="compliance">Compliance & Regulatory Report</option>
                                <option value="simulation">Simulation After-Action Report</option>
                            </select>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label for="start-date" className="block text-slate-300 text-sm font-semibold mb-2">Start Date</label>
                                <input type="date" id="start-date" className="input-field" />
                            </div>
                            <div>
                                <label for="end-date" className="block text-slate-300 text-sm font-semibold mb-2">End Date</label>
                                <input type="date" id="end-date" className="input-field" />
                            </div>
                        </div>


                        <div>
                            <h3 className="text-slate-300 text-sm font-semibold mb-2">Include:</h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                <label className="inline-flex items-center text-slate-300 cursor-pointer" />
                                <input type="checkbox" className="form-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" checked />
                                <span className="ml-2">Timeline & Logs</span>

                                <label className="inline-flex items-center text-slate-300 cursor-pointer" />
                                <input type="checkbox" className="form-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" checked />
                                <span className="ml-2">Action Status</span>

                                <label className="inline-flex items-center text-slate-300 cursor-pointer" />
                                <input type="checkbox" className="form-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" />
                                <span className="ml-2">Forensic Data</span>

                                <label className="inline-flex items-center text-slate-300 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" />
                                    <span className="ml-2">Team Notes</span>
                                </label>
                                <label className="inline-flex items-center text-slate-300 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" />
                                    <span className="ml-2">Affected Assets Details</span>
                                </label>
                            </div>
                        </div>

                        <button id="generate-report-btn" className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
                            <span id="button-text">GENERATE REPORT</span>
                            <div id="button-spinner" className="spinner ml-3 hidden"></div>
                        </button>
                    </div>
                </div>


                <div className="bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-xl border border-slate-700 card-enter" >
                    <h2 className="text-2xl font-bold text-white mb-6">Report Preview</h2>

                    <div id="report-preview-area" className="bg-slate-900 bg-opacity-50 border border-slate-700 rounded-lg p-6 h-[500px] overflow-y-auto custom-scrollbar text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        <p className="text-center text-slate-500 py-10">Select parameters and click "GENERATE REPORT" to see a preview.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                        <button id="download-pdf-btn" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition duration-200" disabled>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Download PDF
                        </button>
                        <button id="view-in-browser-btn" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition duration-200" disabled>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            View Full Report
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}


export default Report