import { Children, useState } from 'react'
import './App.css'
import IncidentResponseDashboard from './pages/IRD/IncidentResponseDashboard.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Nav from './components/Nav.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'


function NavLayOut() {
  return (
    <>
      {/* <Nav /> */}
      <Outlet/> {" "}
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
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/investigate",
          element: <IncidentResponseDashboard />
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
