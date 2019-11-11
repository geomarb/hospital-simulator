import React from 'react';
import './styles.css';

const OutputError = ({
  errorMessage,
  setOutput,
}) => {
  if (!errorMessage) {
    return '';
  }
  return (
    <div className="output output-error">
      <button
        type="button"
        className="output-close-button output-close-button-error"
        onClick={() => setOutput('')}
      >
        X
      </button>
      <p className="output-result">
        {`${errorMessage}!`}
      </p>
    </div>
  );
};

export { OutputError as default };
