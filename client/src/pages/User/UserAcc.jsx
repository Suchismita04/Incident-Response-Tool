import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const UserAcc = () => {
    const [userName,setUserName]= useState()
    const [userEmail,setUserEmail]=useState()

    const getUserInfo=async()=>{

     try {
        const res= await axios.get("http://localhost:4000/api/user/getUserInfo")
        console.log("response:",res)
        setUserEmail(res.data.email)
        setUserName(res.data.name)

     } catch (error) {
        console.error("Error:",error)
     }


    } 
    
    useEffect(()=>{
        getUserInfo()
    },[])
    
    return (

        <>
            <header className="bg-slate-900 bg-opacity-70 backdrop-blur-md border-b border-slate-700 py-4 px-6 flex justify-between items-center z-20">
                <div className="flex items-center">
                    <h1 className="text-2xl font-extrabold text-indigo-400 mr-4">CyberShield</h1>
                    <span className="text-slate-300 text-lg">User Control Panel</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-slate-400 hover:text-white transition duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        <Link to={"/dashboard"} className="ml-1">Back to Dashboard</Link>
                    </button>
                    <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition duration-200">
                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </header>



            <main className=" bg-slate-700 p-6   gap-6 relative z-10" style={{"height":"100vh"}}>




                <div className="lg:col-span-3 bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-xl border border-slate-700 card-enter" >


                    <div id="profile-content" className="content-section">
                        <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="full-name" className="block text-slate-300 text-sm font-semibold mb-2">Full Name</label>
                                <input type="text" id="full-name" value={userName} className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-slate-300 text-sm font-semibold mb-2">Email (AUTH ID)</label>
                                <input type="email" id="email" value={userEmail} className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" readOnly />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-slate-300 text-sm font-semibold mb-2">Role / Designation</label>
                                <input type="text" id="role" value="Lead Security Analyst" className="w-full px-4 py-3 rounded-lg bg-slate-900 bg-opacity-50 text-white border border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition duration-300" />
                            </div>
                            <div>
                                <label htmlFor="access-level" className="block text-slate-300 text-sm font-semibold mb-2">Access Level</label>
                                <span id="access-level" className="block px-4 py-3 rounded-lg bg-indigo-700 text-white font-medium text-center">Administrator - Full Control</span>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </main>

        </>

    )
}

export default UserAcc;