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
                        <div className="mt-8 flex justify-end">
                            <button className="gradient-button text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
                                Save Profile
                            </button>
                        </div>
                    </div>


                    <div id="security-content" className="content-section hidden">
                        <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">Change Secure Key</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="current-password" className="block text-slate-400 text-sm font-medium mb-2">Current Secure Key</label>
                                        <input type="password" id="current-password" placeholder="••••••••" className="input-field" />
                                    </div>
                                    <div>
                                        <label htmlFor="new-password" className="block text-slate-400 text-sm font-medium mb-2">New Secure Key</label>
                                        <input type="password" id="new-password" placeholder="••••••••" className="input-field" />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-new-password" className="block text-slate-400 text-sm font-medium mb-2">Confirm New Secure Key</label>
                                        <input type="password" id="confirm-new-password" placeholder="••••••••" className="input-field" />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button className="gradient-button text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
                                        Update Secure Key
                                    </button>
                                </div>
                            </div>

                            <hr className="border-slate-700" />

                            <div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">Two-Factor Authentication (2FA)</h3>
                                <div className="flex items-center justify-between bg-slate-700 p-4 rounded-lg">
                                    <span className="text-lg text-white">2FA Status: <span className="text-green-400 font-semibold">Active</span></span>
                                    <button className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full transition duration-200">
                                        Disable 2FA
                                    </button>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Highly recommended htmlFor enhanced account security.</p>
                            </div>

                            <hr className="border-slate-700" />

                            <div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">Recent Login Activity</h3>
                                <div className="bg-slate-700 p-4 rounded-lg space-y-2">
                                    <p className="text-slate-300 text-sm">Last Login: Aug 12, 2025, 12:05 PM from London, UK (IP: 203.0.113.45)</p>
                                    <p className="text-slate-300 text-sm">Previous Login: Aug 11, 2025, 09:10 AM from New York, USA (IP: 198.51.100.22)</p>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">If you see suspicious activity, please change your secure key immediately.</p>
                            </div>
                        </div>
                    </div>


                    <div id="integrations-content" className="content-section hidden">
                        <h2 className="text-2xl font-bold text-white mb-6">Connected Integrations</h2>
                        <p className="text-slate-400 mb-6">Manage external services connected to your CyberShield account.</p>
                        <div className="space-y-4">
                            <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                                <span className="text-lg text-white">Splunk <span className="text-slate-400 text-sm">(SIEM Data)</span></span>
                                <span className="text-green-400 font-semibold text-sm">Connected</span>
                            </div>
                            <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                                <span className="text-lg text-white">Microsoft Azure Sentinel <span className="text-slate-400 text-sm">(Cloud Logs)</span></span>
                                <span className="text-green-400 font-semibold text-sm">Connected</span>
                            </div>
                            <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                                <span className="text-lg text-white">VirusTotal <span className="text-slate-400 text-sm">(Threat Intel)</span></span>
                                <span className="text-green-400 font-semibold text-sm">Connected</span>
                            </div>
                            <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                                <span className="text-lg text-white">Slack <span className="text-slate-400 text-sm">(Notifications)</span></span>
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-200">
                                    Connect
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button className="gradient-button text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
                                Add New Integration
                            </button>
                        </div>
                    </div>


                    <div id="billing-content" className="content-section hidden">
                        <h2 className="text-2xl font-bold text-white mb-6">Billing & Subscription</h2>
                        <div className="space-y-6">
                            <div className="bg-slate-700 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">Current Plan: Enterprise Platinum</h3>
                                <p className="text-white text-lg mb-2">Cost: <span className="font-bold">$2,500/month</span></p>
                                <p className="text-slate-400 text-sm">Features: Unlimited Incidents, Advanced Automation, Dedicated Support, API Access</p>
                                <div className="mt-4 flex justify-end">
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-200">
                                        Upgrade/Downgrade Plan
                                    </button>
                                </div>
                            </div>

                            <hr className="border-slate-700" />

                            <div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">Payment Method</h3>
                                <p className="text-white text-lg">**** **** **** 4242 <span className="text-slate-400 text-sm">(Expires 12/26)</span></p>
                                <div className="mt-4 flex justify-end">
                                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-200">
                                        Update Payment Method
                                    </button>
                                </div>
                            </div>

                            <hr className="border-slate-700" />

                            <div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">Billing History</h3>
                                <p className="text-slate-400 text-sm">No recent billing history available.</p>
                                <div className="mt-4 flex justify-end">
                                    <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-200">
                                        View Full History
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="notifications-content" className="content-section hidden">
                        <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">Email Notifications</h3>
                                <div className="space-y-2">
                                    <label className="inline-flex items-center text-slate-300 cursor-pointer">
                                        <input type="checkbox" className="htmlForm-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" checked />
                                        <span className="ml-2">Critical Incident Alerts</span>
                                    </label><br />
                                    <label className="inline-flex items-center text-slate-300 cursor-pointer">
                                        <input type="checkbox" className="htmlForm-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" checked />
                                        <span className="ml-2">New Incident Assignment</span>
                                    </label><br />
                                    <label className="inline-flex items-center text-slate-300 cursor-pointer">
                                        <input type="checkbox" className="htmlForm-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" />
                                        <span className="ml-2">Weekly Activity Summary</span>
                                    </label>
                                </div>
                            </div>

                            <hr className="border-slate-700" />

                            <div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-3">In-App Notifications</h3>
                                <div className="space-y-2">
                                    <label className="inline-flex items-center text-slate-300 cursor-pointer">
                                        <input type="checkbox" className="htmlForm-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" checked />
                                        <span className="ml-2">Real-time Threat Updates</span>
                                    </label><br />
                                    <label className="inline-flex items-center text-slate-300 cursor-pointer">
                                        <input type="checkbox" className="htmlForm-checkbox text-indigo-500 bg-slate-700 border-slate-600 rounded" checked />
                                        <span className="ml-2">Playbook Completion</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="gradient-button text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
                                    Save Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>

    )
}

export default UserAcc;