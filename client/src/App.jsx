import { Children, useState } from 'react'
import './App.css'
import IncidentResponseDashboard from './pages/IRD/IncidentResponseDashboard.jsx'
import Nav from './components/Nav.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import DataProvider from './context/DataProvider.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'


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
          element: <Dashboard/>
        },
        {
          path: "investigate/:id",
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
