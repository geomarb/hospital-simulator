import React from 'react'
import { drugs } from '../../data/drug.json'

export default function DrugItem({ patients }) {
  return (
    <div className="drugs">
      <h2>Drugs</h2>
      <ul>
        {drugs.map(drug => {
          return (
            <li key={drug.id}>
              <header>{drug.description}</header>
            </li>
          )
        })}
      </ul>
    </div>
  )
}