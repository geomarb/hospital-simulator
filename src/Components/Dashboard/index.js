import React, { useState } from 'react'
import './styles.css'
import HealthyStateItem from './HealthyStateItem'
import CommandForm from './CommandForm'
import DrugItem from './DrugItem'
import Help from './Help'

export default function Dashboard() {
  const [patients, setPatients] = useState([])
  const [showHelp, setShowHelp] = useState(false)
  return (
    <div className="dashboard">
      <header>
        <h1>Hospital Simulator</h1>
      </header>
      <HealthyStateItem patients={patients} />
      <DrugItem />
      <CommandForm setPatients={setPatients} setShowHelp={setShowHelp} showHelp={showHelp} />
      {showHelp ? (<Help />) : ""}
    </div>
  )
}