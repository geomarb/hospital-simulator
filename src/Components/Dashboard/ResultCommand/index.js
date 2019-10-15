import React from 'react'
import flyingSpaphettiMonster from '../../../assets/Flying-Spaghetti-Monster.jpg'
import './styles.css'

export default function ResultCommand({ result, setResult, flyingSpaghettiMonsterWasHere, setFlyingSpaghettiMonsterWasHere }) {
  return (
    <>
      {
        result.error ? (
          <div className="output output-error">
            <button className="output-close-button output-close-button-error" onClick={() => setResult("")}>X</button>
            <p className="output-result">{result.error}!</p>
          </div>
        ) :
          ""
      }
      {
        result.text ? (
          <div className="output output-text">
            <button className="output-close-button output-close-button-text" onClick={() => setResult("")}>X</button>
            <p className="output-result">{result.text}</p>
          </div>
        ) :
          ""
      }
      {
        flyingSpaghettiMonsterWasHere ? (
          <div className="output output-img">
            <img src={flyingSpaphettiMonster} alt="Flying Spaghetti Monster is here!"></img>
            <button className="output-close-button output-close-button-text" onClick={() => setFlyingSpaghettiMonsterWasHere(false)}>X</button>
          </div>
        ) :
          ""
      }
    </>
  )
}