import { useState } from 'react'
import './App.css'
import IncidentResponseDashboard from './pages/IRD/IncidentResponseDashboard.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Nav from './components/Nav.jsx'

function App() {
 

  return (
    <>
    <Nav/>
    <Dashboard/>
      {/* <IncidentResponseDashboard/> */}
    </>
  )
}

export default App
