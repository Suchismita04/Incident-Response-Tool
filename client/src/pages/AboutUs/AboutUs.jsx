
const AboutUs=()=>{
    return(
        <>

    <main className="py-20 md:py-28 bg-indigo-950">

       
        <section className="container mx-auto px-4 text-center mb-16 max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 animate-reveal">
                Our Story: From Code to Custodian.
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 animate-reveal animate-delay-1">
                Born from the front lines of digital defense, CyberShield was founded by a team of battle-hardened security engineers and data scientists. We saw a gap between threat intelligence and actionable response and set out to close it.
            </p>
        </section>

        <section className="container mx-auto px-4 mb-20 max-w-7xl">
            <div className="grid gap-12 items-center">
                <div className="bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 shadow-xl animate-reveal animate-delay-2">
                    <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-4">
                        Our Mission
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-8">
                        Our mission is to arm security professionals with the tools they need to defend against sophisticated attacks. By providing real-time intelligence, automated workflows, and comprehensive analysis, we minimize the impact of breaches and reduce the time to resolution.
                    </p>
                    <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-4">
                        Our Vision
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        We envision a world where every organization is cyber resilient. We believe that a proactive and rapid response to threats is the foundation of a strong security posture, and we are committed to building the technology that makes this possible for everyone.
                    </p>
                </div>
               
            </div>
        </section>

     
        <section class="container mx-auto px-4 mb-20 max-w-6xl">
            <h2 class="text-4xl font-bold text-center text-white mb-10 animate-reveal">
                Core Principles
            </h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
               
                <div class="bg-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 feature-card transition duration-300 ease-in-out animate-reveal animate-delay-1">
                    <div class="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-700 text-white mx-auto mb-4 transform rotate-45 border-2 border-indigo-500">
                        
                        <svg class="w-8 h-8 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 class="font-semibold text-lg text-white mb-2 text-center">Speed</h3>
                    <p class="text-slate-400 text-sm text-center">Time is critical. Our tools and processes are built to enable rapid action and minimize damage.</p>
                </div>
                
                <div class="bg-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 feature-card transition duration-300 ease-in-out animate-reveal animate-delay-2">
                    <div class="flex items-center justify-center w-14 h-14 rounded-full bg-blue-700 text-white mx-auto mb-4 transform rotate-45 border-2 border-blue-500">
                        
                        <svg class="w-8 h-8 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.01 12.01 0 002.944 12c.046 2.651.983 5.378 2.633 7.649a1.002 1.002 0 00.125.176M12 14v10m0-10a2 2 0 100-4 2 2 0 000 4z" /></svg>
                    </div>
                    <h3 class="font-semibold text-lg text-white mb-2 text-center">Precision</h3>
                    <p class="text-slate-400 text-sm text-center">Our clients trust us to provide accurate analysis and decisive action during their most challenging moments.</p>
                </div>
               
                <div class="bg-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 feature-card transition duration-300 ease-in-out animate-reveal animate-delay-3">
                    <div class="flex items-center justify-center w-14 h-14 rounded-full bg-violet-700 text-white mx-auto mb-4 transform rotate-45 border-2 border-violet-500">
                      
                        <svg class="w-8 h-8 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6m-2-5a2 2 0 100-4 2 2 0 000 4zM20 9a2 2 0 100-4 2 2 0 000 4zM9 20a2 2 0 100-4 2 2 0 000 4zM15 20a2 2 0 100-4 2 2 0 000 4z" /></svg>
                    </div>
                    <h3 class="font-semibold text-lg text-white mb-2 text-center">Simplicity</h3>
                    <p class="text-slate-400 text-sm text-center">We provide clear, concise, and actionable information to cut through the noise of a crisis.</p>
                </div>
               
                <div class="bg-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 feature-card transition duration-300 ease-in-out animate-reveal animate-delay-4">
                    <div class="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-700 text-white mx-auto mb-4 transform rotate-45 border-2 border-emerald-500">
                     
                        <svg class="w-8 h-8 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l1.5-1.5M10 16a6 6 0 11-12 0 6 6 0 0112 0zm-3 0a3 3 0 10-6 0 3 3 0 006 0zm-2 2h4l4 4M21 21v-4m0 0h-4M12 21h.01M12 18v-4" /></svg>
                    </div>
                    <h3 class="font-semibold text-lg text-white mb-2 text-center">Collaboration</h3>
                    <p class="text-slate-400 text-sm text-center">We believe in shared knowledge and teamwork to build resilient security programs that can withstand any challenge.</p>
                </div>
            </div>
        </section>


    </main>




        
        
        </>
    )
}


export default AboutUs;