import React from 'react'
import { healthyStates } from '../../data/healthyState.json'

export default function HealthyStateItem({ patients }) {
  return (
    <div className="healthyState">
      <h2>Healthty States</h2>
      <ul>
        {healthyStates.map(state => {
          return (
            <li key={state.id}>
              <header>{state.description}</header>
              <strong>{patients.filter(patient => patient.state === state.id).length}</strong>
            </li>
          )
        })}
        <li>
          <header>Total</header>
          <strong>{patients.length}</strong>
        </li>
      </ul>
    </div>
  )
}