import { Children, useState } from 'react'
import './App.css'
import IncidentResponseDashboard from './pages/IRD/IncidentResponseDashboard.jsx'
import Nav from './components/Nav.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import DataProvider from './context/DataProvider.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import UserAcc from './pages/User/UserAcc.jsx'
import LandingPage from './pages/Home/LandingPage.jsx'
import LogIn from './pages/User/LogIn.jsx'


function NavLayOut() {
  return (
    <>
    <DataProvider>
      <Nav />
      <Outlet/> {" "}
      </DataProvider>
    </>
  )
}


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <NavLayOut/>
        
      ),

      children: [
        {
          index:true,
          element: <LandingPage/>
        },
        {
          path: "/dashboard",
          element: <Dashboard/>
        },
        {
          path: "investigate/:id",
          element: <IncidentResponseDashboard />
        },
        {
          path:"account",
          element:<UserAcc/>
        },
        {
          path:"user/logIn",
          element:<LogIn/>
        }

      ]

    }
  ])


  return (
    <>

      <RouterProvider router={router} />
    </>
  )
}

export default App
