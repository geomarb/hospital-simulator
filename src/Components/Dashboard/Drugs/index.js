/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';

const DrugItem = ({ givenDrugs, drugs }) => (
  <div className="drugs">
    <h2
      className={(givenDrugs.length > 0 ? 'given-drug' : '')}
    >
      Drugs

    </h2>
    <ul>
      {drugs.map((drug) => (
        <li
          key={drug.id}
          className={givenDrugs.find((id) => id === drug.id) ? 'given-drug' : ''}
        >
          <header>{drug.description}</header>
        </li>
      ))}
    </ul>
  </div>
);

export { DrugItem as default };
