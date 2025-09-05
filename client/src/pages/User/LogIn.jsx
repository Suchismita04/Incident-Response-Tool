import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"




const LogIn = ({ switchToSignUp, onClose }) => {

   const navigate= useNavigate() 
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })


    const handleChange=(e)=>{
       setFormData({
        ...formData,
        [e.target.name]:e.target.value
       })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res= await axios.post("http://localhost:4000/api/user/logIn")
            console.log("response data",res)
            if(onClose) onClose()
            navigate('/dashboard')

        } catch (error) {
            console.error("Error",error)
        }
    }


    return (

        <>
            <div className="relative z-10 border border-indigo-500 bg-slate-800 bg-opacity-70 backdrop-blur-lg p-8 md:p-10 rounded-xl  max-w-md w-full  card-enter">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Access Terminal</h1>
                    <p className="text-slate-400 text-lg">Log in to your CyberShield dashboard.</p>
                </div>


                <form >
                    <div className="mb-6">
                        <label for="email" className="block text-slate-300 text-sm font-semibold mb-2">AUTH ID</label>
                        <input type="email" id="email" onChange={handleChange} value={formData.email} name="email" placeholder="user@cybershield.com" className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" required />
                    </div>
                    <div className="mb-6">
                        <label for="password" className="block text-slate-300 text-sm font-semibold mb-2">Secure Key</label>
                        <input type="password" id="password" onChange={handleChange} value={formData.password} name="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" required />
                    </div>
                    <div className="flex justify-between items-center mb-8">
                        <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition duration-200">Forgot Secure Key?</a>
                    </div>
                    <button type="submit" onSubmit={handleSubmit} className="w-full gradient-bg text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out button-hover-glow">
                        INITIATE ACCESS
                    </button>
                </form>


                <p className="text-center text-slate-400 text-sm mt-8">
                    New to CyberShield?
                    <button onClick={switchToSignUp}  className="text-indigo-400 hover:text-indigo-300 font-semibold transition duration-200">Create Profile</button>

                </p>
            </div>

        </>
    )
}


export default LogIn;