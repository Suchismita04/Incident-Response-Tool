
import DataFlowSection from "./DataFlowSection";
import HeroSection from "./HeroSection";
import ImpactfulResultsSection from "./ImpactfulResultsSection";
import Testimonials from "./Testimonials";



const LandingPage = () => {
    return (
        <>

            <div className="bg-gradient-to-br from-slate-950 to-slate-900">
            <HeroSection/>
            <DataFlowSection/>
            <ImpactfulResultsSection/>
            <Testimonials/>
            

            </div>



        </>
    )


}
export default LandingPage;