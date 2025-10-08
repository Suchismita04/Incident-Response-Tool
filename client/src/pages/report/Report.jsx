import dayjs from "dayjs";
import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"




const Report = () => {


    // Define the array
    const reportTypes = [
        "Executive Summary",
        "Detailed Incident Analysis",
        "Forensic Analysis Report",
        "Compliance & Regulatory Report",
        "Simulation After-Action Report"
    ];

    const location = useLocation();
    const { incident, actions, startDate: passedStartDate, endDate: passedEndDate } = location.state || {};

    const [incidents, setIncidents] = useState([]);
    const [reportType, setReportType] = useState([]);
    const [includeOpt, setIncludeOpt] = useState(actions || []);
    const [startDate, setStartDate] = useState(passedStartDate || "");
    const [endDate, setEndDate] = useState(passedEndDate || "");
    const [reportPreview, setReportPreview] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);


    const navigate=useNavigate()
  


    useEffect(() => {
        if (incident) setIncidents([incident]);
    }, [incident]);

    useEffect(() => {
        if (incident) {
            console.log("Incident received in Report:", incident);
        }
    }, [incident]);



    const handleGenerateReport = () => {
        console.log("working")
        if (incidents.length == 0) {
            alert("Please select at least one incident and a report type.");

        }

        const previewText = `
Report Type: ${reportType || "N/A"}
Date Range: ${startDate || "N/A"} → ${endDate || "N/A"}

Selected Incidents:
${incidents.map((inc) => {
            const formattedTime = dayjs(inc["@timestamp"]).format("hh:mm A - MMM DD, YYYY");
            return `- ${inc.rule?.description || "Unknown"} (Severity: ${inc.rule?.level || "N/A"}, Detected: ${formattedTime}, Agent: ${inc.agent?.name || "N/A"} - ${inc.agent?.ip || "N/A"})`;
        }).join("\n")}

Included Actions:
${includeOpt.length > 0 ? includeOpt.map(opt => {
            return incidents.map(inc => {
                let sectionData = "";
                if (opt === "Timeline & Logs") sectionData = `Timeline: ${inc.timeline?.join(", ") || inc["@timestamp"]}`;
                if (opt === "Action Status") sectionData = `Actions Taken: ${inc.actions?.join(", ") || "Pending"}`;
                if (opt === "Forensics") sectionData = `Forensics: ${inc.forensics?.join(", ") || "Not Available"}`;
                return `${opt}: ${sectionData}`;
            }).join("\n");
        }).join("\n") : "None"}
    
--- END OF PREVIEW ---
`;

        setReportPreview(previewText);
        setIsGenerated(true);

        setReportPreview(previewText);
        console.log("report", reportPreview)
        setIsGenerated(true);
    }

    const handleDownloadPDF = () => {
        var doc = new jsPDF()


        doc.setFontSize(16);
        doc.text("CyberShield Incident Report", 10, 10);


        doc.setFontSize(12);
        const lines = doc.splitTextToSize(reportPreview, 180);
        doc.text(lines, 10, 20);

        doc.save("incident-report.pdf");
        navigate('/dashboard')
    };






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
                        <Link to={'/dashboard'} className="ml-1">Back to Dashboard</Link>
                    </button>
                </div>
            </header>


            <div className="bg-slate-600 flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">


                <div className="bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-xl border border-slate-700 card-enter">
                    <h2 className="text-2xl font-bold text-white mb-6">Configure Report Parameters</h2>

                    <div className="space-y-6">

                        <div >
                            <label htmlFor="incident-select" className="block text-white text-sm font-semibold mb-2">Selected Incident(s)</label>
                            
                                {incidents.map((data, idx) => {
                                    return <div value={data} key={idx} className="text-white"> {data.rule?.description}</div>

                                })}
                        </div>


                        <div>
                            <label htmlFor="report-type" className="block text-slate-300 text-sm font-semibold mb-2">Report Type / Template</label>
                            <div className="text-white bg-slate-600 rounded m-2 p-2 input-field">
                                <select
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="bg-slate-700 text-white p-2 rounded w-full"
                                 
                                >
                                    <option value="">Select Report Type</option>
                                    {reportTypes.map((type, idx) => (
                                        <option key={idx} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="start-date" className="block text-slate-300 text-sm font-semibold mb-2">Start Date</label>
                                <input type="date" onChange={(e) => { setStartDate(e.target.value) }} id="start-date" className="text-white bg-slate-600 rounded m-2 p-2" />
                            </div>
                            <div>
                                <label htmlFor="end-date" className="block text-slate-300 text-sm font-semibold mb-2">End Date</label>
                                <input type="date" onChange={(e) => { setEndDate(e.target.value) }} id="end-date" className="text-white bg-slate-600 rounded m-2 p-2" />
                            </div>
                        </div>


                        <div>
                            <h3 className="text-slate-300 text-sm font-semibold mb-2">Included Sections:</h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-white bg-slate-600 rounded w-60 p-2 m-2">
                                {includeOpt.length > 0 ? includeOpt.join(", ") : "None"}
                            </div>
                        </div>

                        <button id="generate-report-btn" onClick={handleGenerateReport} className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
                            <span id="button-text">GENERATE REPORT</span>
                            <div id="button-spinner" className="spinner ml-3 hidden"></div>
                        </button>
                    </div>
                </div>


                <div className="bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-xl border border-slate-700 card-enter" >
                    <h2 className="text-2xl font-bold text-white mb-6">Report Preview</h2>

                    <div id="report-preview-area" className="bg-slate-900 bg-opacity-50 border border-slate-700 rounded-lg p-6 h-[500px] overflow-y-auto custom-scrollbar text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {reportPreview || (<p className="text-center text-slate-500 py-10">Select parameters and click "GENERATE REPORT" to see a preview.</p>)}
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                        <button
                            id="download-pdf-btn"
                            className={`flex-1 ${isGenerated ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-800 cursor-not-allowed"} text-white font-semibold py-3 rounded-lg flex items-center justify-center transition duration-200`}
                            disabled={!isGenerated}
                            onClick={handleDownloadPDF}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}


export default Report