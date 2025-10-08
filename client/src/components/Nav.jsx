import React, { useState } from "react";
import LogIn from "../pages/User/LogIn";
import ModalComponent from "./ModalComponent";
import SignUp from "../pages/User/SignUp";
import { Link, useLocation, useNavigate } from "react-router-dom";





const Nav = () => {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState("login");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const location = useLocation()

    const isDisabled = location.pathname != "/dashboard"


    return (
        <>




            <nav className="bg-indigo-900 dark:bg-gray-900  w-full  top-0 start-0  dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <Link to={'/'} className="self-center text-2xl font-semibold whitespace-nowrap text-white">CyberShield</Link>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">


                        {isDisabled ? (<><button type="button" onClick={() => { setView("login"); setOpen(true); }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button><ModalComponent open={open}
                            handleClose={handleClose}
                            component={view === 'login' ?
                                <LogIn switchToSignUp={() => setView('SignUp')} onClose={handleClose} />
                                : <SignUp switchToLogin={() => setView('login')} onClose={handleClose} />} /></>) : <>
                            {/* Show user account logo when on dashboard */}
                            <img
                                src="/assets/user-avatar.png"
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                                onClick={() => navigate("/profile")}
                            />
                        </>}




                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/aboutUs" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500" aria-current="page">About Us</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>





        </>
    )
}

export default Nav;