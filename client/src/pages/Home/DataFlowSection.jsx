

const DataFlowSection=()=>{
    return(
        <>
        <section className="py-20 md:py-28 bg-slate-900 border-t border-b border-slate-800">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 animate-reveal">Beyond Reactive. Towards Predictive.</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 animate-reveal animate-delay-1">
                CyberShield integrates, analyzes, and predicts, transforming raw data into actionable intelligence. See how.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                <div className="flex flex-col items-center animate-reveal animate-delay-2">
                    <div className="w-20 h-20 rounded-full bg-indigo-700 flex items-center justify-center text-white text-3xl font-bold mb-4 transform rotate-45 border-2 border-indigo-500">
                        <svg className="w-10 h-10 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-1.5-.5a.5.5 0 011 0V11a.5.5 0 01-1 0V7.5a.5.5 0 01.5-.5zM12 18h.01M8 12h.01M16 12h.01M9 6v.01M15 6v.01"></path></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Omni-Source Ingestion</h3>
                    <p className="text-slate-400 text-center text-sm">Collects data from every endpoint, cloud, and network device in real-time.</p>
                </div>
                <div className="flex flex-col items-center animate-reveal animate-delay-3">
                    <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-white text-3xl font-bold mb-4 transform rotate-45 border-2 border-blue-500">
                         <svg className="w-10 h-10 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c-1.38 0-2.5-1.12-2.5-2.5S7.62 14 9 14s2.5 1.12 2.5 2.5V19zm12-3c1.38 0 2.5-1.12 2.5-2.5S22.38 10 21 10s-2.5 1.12-2.5 2.5V16z"></path></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Correlation</h3>
                    <p className="text-slate-400 text-center text-sm">Machine learning identifies subtle patterns and anomalies missed by traditional tools.</p>
                </div>
                <div className="flex flex-col items-center animate-reveal animate-delay-4">
                    <div className="w-20 h-20 rounded-full bg-violet-700 flex items-center justify-center text-white text-3xl font-bold mb-4 transform rotate-45 border-2 border-violet-500">
                        <svg className="w-10 h-10 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Automated Remediation</h3>
                    <p className="text-slate-400 text-center text-sm">Execute pre-defined playbooks or initiate instant containment actions.</p>
                </div>
            </div>
        </div>
    </section>
        
        
        
        </>
    )
}


export default DataFlowSection