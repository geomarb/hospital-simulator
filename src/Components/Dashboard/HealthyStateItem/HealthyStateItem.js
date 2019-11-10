import React from 'react';
import { healthyStates } from '../../../data/healthyState.json';
import './styles.css';

export default function HealthyStateItem({ patients }) {
  return (
    <div className="healthy-state">
      <h2
        className={patients.length > 0 ? 'changed' : ''}
      >
        Healthty States

      </h2>
      <ul>
        {healthyStates.map((state) => (
          <li
            key={state.id}
            className={patients.find((patient) => patient.healthyStateId === state.id) ? 'changed' : ''}
          >
            <header>{state.description}</header>
            <strong>{patients.filter((patient) => patient.healthyStateId === state.id).length}</strong>
          </li>
        ))}
        <li
          className={patients.length > 0 ? 'changed' : ''}
        >
          <header>TOTAL</header>
          <strong>{patients.length}</strong>
        </li>
      </ul>
    </div>
  );
}
