import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";





const SignUp = ({ switchToLogin ,onClose }) => {


    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    })



    const handleChage = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/user/register", formData)
            if(onClose) onClose()
              navigate('/dashboard')

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <div className="relative z-10 bg-slate-800 border border-indigo-500 bg-opacity-70 backdrop-blur-lg p-2 md:p-6 rounded-xl shadow-2xl max-w-md w-full card-enter"

            >
                <div className="text-center m-4">
                    <h3 className="text-xl md:text-4xl font-extrabold text-white mb-2">Establish Profile</h3>
                    <p className="text-slate-400 text-lg">Create your secure CyberShield account.</p>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label for="fullname" className="block text-slate-300 text-sm font-semibold mb-2">Name</label>
                        <input type="text" id="name" onChange={handleChage} value={formData.name} name="name" placeholder="Jhon" className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" required />
                    </div>
                    <div className="mb-4">
                        <label for="email" className="block text-slate-300 text-sm font-semibold mb-2">AUTH ID</label>
                        <input type="email" id="email" onChange={handleChage} value={formData.email} name="email" placeholder="user@cybershield.com" className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" required />
                    </div>
                    <div className="mb-4">
                        <label for="password" className="block text-slate-300 text-sm font-semibold mb-2">Secure Key</label>
                        <input type="password" id="password" onChange={handleChage} value={formData.password} name="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" required />
                    </div>

                    <button type="submit" className="w-full gradient-bg text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out button-hover-glow">
                        SECURE PROFILE
                    </button>
                </form>


                <p className="text-center text-slate-400 text-sm mt-4">
                    Already have an existing profile?
                    <button onClick={switchToLogin} className="text-indigo-400 hover:text-indigo-300 font-semibold transition duration-200">Access Terminal</button>

                </p>
            </div>




        </>
    )
}


export default SignUp