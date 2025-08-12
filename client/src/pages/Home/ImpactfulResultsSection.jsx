




const ImpactfulResultsSection =()=>{
    return(
        <>
        <section className="py-20 md:py-28 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 animate-reveal">Tangible Impact. Measurable Security.</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 animate-reveal animate-delay-1">
                Our clients don't just feel safer; they see the difference in their security posture and operational efficiency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="bg-slate-700 hover:border-indigo-500 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-900 p-6 rounded-xl shadow-lg border border-slate-600">
                    <p className="text-5xl font-extrabold text-indigo-400 mb-2">90%</p>
                    <p className="text-slate-300 font-semibold">Reduced Alert Fatigue</p>
                </div>
                <div className="bg-slate-700 p-6 hover:border-indigo-500 rounded-xl shadow-lg border border-slate-600 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-900">
                    <p className="text-5xl font-extrabold text-blue-400 mb-2">75%</p>
                    <p className="text-slate-300 font-semibold">Faster Incident Resolution</p>
                </div>
                <div className="bg-slate-700 p-6 hover:border-indigo-500 rounded-xl shadow-lg border border-slate-600 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-900">
                    <p className="text-5xl font-extrabold text-violet-400 mb-2">30%</p>
                    <p className="text-slate-300 font-semibold">Lower Operational Costs</p>
                </div>
                 <div className="bg-slate-700 p-6 hover:border-indigo-500 rounded-xl shadow-lg border border-slate-600 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-900">
                    <p className="text-5xl font-extrabold text-emerald-400 mb-2">24/7</p>
                    <p className="text-slate-300 font-semibold">Active Threat Monitoring</p>
                </div>
            </div>
        </div>
    </section>
        
        
        </>
    )
}



export default ImpactfulResultsSection;
