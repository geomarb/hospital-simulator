import React from 'react';
import flyingSpaghettiMonster from '../../../../../assets/Flying-Spaghetti-Monster.jpg';
import './styles.css';

const OutputFlyingSpaghettiMonster = ({
  isFlyingSpaghettiMonsterHere,
  setisFlyingSpaghettiMonsterHere,
}) => {
  if (!isFlyingSpaghettiMonsterHere) {
    return '';
  }
  return (
    <div className="output output-img">
      <img src={flyingSpaghettiMonster} alt="Flying Spaghetti Monster is here!" />
      <button
        type="button"
        className="output-close-button output-close-button-text"
        onClick={() => setisFlyingSpaghettiMonsterHere(false)}
      >
        X
      </button>
    </div>
  );
};

export { OutputFlyingSpaghettiMonster as default };
