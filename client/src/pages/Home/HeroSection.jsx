


const HeroSection = () => {
    return (
        <>
            <div className="bg-indigo-950" style={{backgroundImage:`url('src/assets/landingImg.jpg')`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover",
                backgroundPosition:"center",
                opacity:"0.9"
            }}>



                <section className="relative h-screen flex items-center justify-center text-center overflow-hidden p-4">
                    <div className="animation-pluse"></div>

                    <div className="relative z-10 max-w-5xl mx-auto">
                        <span className="text-indigo-100 text-lg md:text-xl font-medium mb-4 inline-block animate-reveal">CyberShield: Adaptive Threat Response</span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white animate-reveal animate-delay-1">
                            The <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">Pulse</span> of Protection.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-50 max-w-3xl mx-auto mb-10 animate-reveal animate-delay-2">
                            Experience dynamic, real-time defense that evolves with threats. CyberShield doesn't just react; it anticipates, learns, and secures your digital future.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 ">
                            <a href="#" className="bg-gradient-to-r from-blue-400 to-blue-600  text-white  font-bold py-3 px-8 shadow-none hover:shadow-sky-700 transition-shadow duration-300 hover:shadow-lg rounded-full shadow-lg">
                                Request a Live Demo
                            </a>
                            <a href="#" className="bg-transparent border-2 border-indigo-500 text-indigo-100 hover:bg-indigo-600 hover:border-indigo-600 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
                                Explore Features
                            </a>
                        </div>
                    </div>
                </section>
            </div>


        </>
    )
}


export default HeroSection