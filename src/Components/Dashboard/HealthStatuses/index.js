/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';

const HealthStatusItem = ({ patients, healthStatuses }) => (
  <div className="healthy-state">
    <h2 className={patients.length > 0 ? 'changed' : ''}>
      Health States
    </h2>
    <ul>
      {healthStatuses.map((healthStatus) => (
        <li
          key={healthStatus.id}
          className={patients.some(
            (patient) => patient.healthStatusId === healthStatus.id,
          ) ? 'changed' : ''}
        >
          <header>{healthStatus.description}</header>
          <strong>
            {patients.filter(
              (patient) => patient.healthStatusId === healthStatus.id,
            ).length}
          </strong>
        </li>
      ))}
      <li className={patients.length > 0 ? 'changed' : ''}>
        <header>TOTAL</header>
        <strong>{patients.length}</strong>
      </li>
    </ul>
  </div>
);
export { HealthStatusItem as default };
