

const Testimonials=()=>{
    return(
        <>
        <section className="py-20 md:py-28 bg-gradient-to-r from-indigo-900 to-blue-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl font-bold text-white mb-12 animate-reveal">What Our Defenders Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <blockquote className=" shadow-none hover:shadow-sky-500 transition-shadow duration-300 hover:shadow-lg bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 animate-reveal animate-delay-1">
                    <p className="text-lg italic text-slate-300 mb-6">"CyberShield transformed our SOC. The intelligence it provides is unparalleled, allowing us to move from overwhelmed to truly secure."</p>
                    <cite className="font-semibold text-indigo-400">- Dr. Anya Sharma, Head of Cybersecurity, Nexus Global</cite>
                </blockquote>
                <blockquote className="shadow-none hover:shadow-sky-500 transition-shadow duration-300 hover:shadow-lg bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 animate-reveal animate-delay-2">
                    <p className="text-lg italic text-slate-300 mb-6">"We sleep better at night. CyberShield's automation and clarity have made our incident response both faster and more effective."</p>
                    <cite className="font-semibold text-blue-400">- Mark Jensen, CISO, OmniCorp Solutions</cite>
                </blockquote>
            </div>
        </div>
    </section>
        
        
        </>
    )
}


export default Testimonials