import { Link } from "react-router-dom"



const Footer=()=>{
    return(
        <>
        
        <footer className="bg-slate-950 text-slate-400 py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
                <h3 className="text-xl font-bold text-white mb-4">CyberShield</h3>
                <p className="text-sm">&copy; 2025 CyberShield. All rights reserved.</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/aboutUs" className="hover:text-white transition duration-200">Features Overview</Link></li>
                    {/* <li><a href="#" className="hover:text-white transition duration-200">Integrations</a></li> */}
                    <li><a href="#" className="hover:text-white transition duration-200">Case Studies</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/aboutUs" className="hover:text-white transition duration-200">About Us</Link></li>
                    {/* <li><a href="#" className="hover:text-white transition duration-200">Careers</a></li> */}
                    <li>Email: <a href="mailto:contact@cybershield.com" className="hover:text-white transition duration-200">contact@cybershield.com</a></li>
                </ul>
            </div>
        </div>
        <div className="text-center mt-8">
            <a href="#" className="text-slate-500 hover:text-white text-sm mx-2">Privacy Policy</a> |
            <a href="#" className="text-slate-500 hover:text-white text-sm mx-2">Terms of Service</a>
        </div>
    </footer>
        
        </>
    )
}


export default Footer