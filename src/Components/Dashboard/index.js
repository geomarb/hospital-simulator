import React, { useState } from 'react'
import './styles.css'
import HealthyStateItem from './HealthyStateItem/HealthyStateItem'
import CommandForm from './CommandForm'
import DrugItem from './DrugItem'
import Help from './Help'

export default function Dashboard() {
  const [patients, setPatients] = useState([])
  const [showHelp, setShowHelp] = useState(false)
  const [givenDrugs, setGivenDrugs] = useState([])
  return (
    <div className="dashboard">
      <header>
        <h1>Hospital Simulator</h1>
      </header>
      <HealthyStateItem patients={patients} />
      <DrugItem givenDrugs={givenDrugs} />
      <CommandForm
        setPatients={setPatients}
        setShowHelp={setShowHelp}
        setGivenDrugs={setGivenDrugs}
        showHelp={showHelp}
      />
      {showHelp ? (<Help />) : ""}
    </div>
  )
}