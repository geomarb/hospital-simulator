import React from 'react'
import { drugs } from '../../data/drug.json'

export default function DrugItem({ givenDrugs }) {
  return (
    <div className="drugs">
      <h2
        className={(givenDrugs.length > 0 ? "given-drug" : "")}
      >Drugs</h2>
      <ul>
        {drugs.map(drug => {
          return (
            <li
              key={drug.id}
              className={givenDrugs.find(id => id === drug.id) ? "given-drug" : ""}
            >
              <header>{drug.description}</header>
            </li>
          )
        })}
      </ul>
    </div>
  )
}