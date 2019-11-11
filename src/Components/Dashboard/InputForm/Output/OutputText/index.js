import React from 'react';
import './styles.css';

const OutputText = ({
  text,
  setOutput,
}) => {
  if (!text) {
    return '';
  }
  return (
    <div className="output output-text">
      <button
        type="button"
        className="output-close-button output-close-button-text"
        onClick={() => setOutput('')}
      >
        X
      </button>
      <p className="output-result">{text}</p>
    </div>
  );
};

export { OutputText as default };
