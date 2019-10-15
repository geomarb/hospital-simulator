import React, { useState } from 'react'
import execute from '../../../Controller/command'
import ResultCommand from '../ResultCommand'
import './styles.css'


export default function CommandForm({ setPatients, setShowHelp, setGivenDrugs, showHelp }) {
  const startCommand = ""//`"D,D,F" "I,P,AS"`
  const [command, setCommand] = useState(startCommand)
  const [result, setResult] = useState("")
  const [flyingSpaghettiMonsterWasHere, setFlyingSpaghettiMonsterWasHere] = useState(false)

  function handleCommandChange({ target }) {
    target.value = target.value.toUpperCase()
    setCommand(target.value)
  }

  function handleCommandExecution(e) {
    e.preventDefault()

    setCommand(startCommand)
    const { newPatients,
      newResult,
      givenDrugs,
      flyingSpaghettiMonsterWasHere,
      error } = execute(command)
    const showResult = !!newResult ? { text: `[${command}] : ${newResult}` } : { error }

    setPatients(newPatients || [])
    setResult(showResult)
    setGivenDrugs(givenDrugs || [])
    setFlyingSpaghettiMonsterWasHere(flyingSpaghettiMonsterWasHere)
  }

  function handleHelpClick(e) {
    setShowHelp(!showHelp)
  }

  return (
    <div className="command-form" >
      <form onSubmit={handleCommandExecution}>
        <div className="command-form-input">
          <input
            type="text"
            name="command"
            id="command"
            value={command}
            placeholder={`Patient Sate and Drugs. Ex.: "D,F,F" "I,As,P" or F:5,H:2,D:3`}
            onChange={handleCommandChange} />
        </div>
        <div className="command-form-button">
          <button>Execute</button>
          <button className="help-button" type="button" onClick={handleHelpClick}>{!showHelp ? "Show" : "Hide"} Help!</button>
        </div>
      </form>
      <ResultCommand
        result={result}
        setResult={setResult}
        flyingSpaghettiMonsterWasHere={flyingSpaghettiMonsterWasHere}
        setFlyingSpaghettiMonsterWasHere={setFlyingSpaghettiMonsterWasHere}
      />
    </div>
  )
}