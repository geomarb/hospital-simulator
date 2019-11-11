/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Output from './Output';
import './styles.css';

const InputForm = ({
  setPatients,
  setShowHelp,
  setGivenDrugs,
  showHelp,
  processInput,
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isFlyingSpaghettiMonsterHere, setisFlyingSpaghettiMonsterHere] = useState(false);

  const handleInputChange = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setInput(e.target.value);
  };

  const handleCommandExecution = (e) => {
    e.preventDefault();

    setInput('');
    const {
      patients,
      output: outputResult,
      drugIdList,
      isFlyingSpaghettiMonsterHere: isFlyingSpaghettiMonsterHereResult,
      error,
    } = processInput(input);
    const outputText = outputResult ? { text: `[${input}] : ${outputResult}` } : { error };

    setPatients(patients);
    setOutput(outputText);
    setGivenDrugs(drugIdList);
    setisFlyingSpaghettiMonsterHere(isFlyingSpaghettiMonsterHereResult);
  };

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="input-form">
      <form onSubmit={handleCommandExecution}>
        <div className="input-form-input">
          <input
            type="text"
            name="input"
            id="input"
            value={input}
            placeholder={'Health Status and Drugs. Ex.: "D,F,F" "I,AS,P"'}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-form-button">
          <input type="submit" className="button" value="Execute" />
          <input
            type="button"
            className="button help-button"
            onClick={handleHelpClick}
            value={!showHelp ? 'Show Help' : 'Hide Help'}
          />
        </div>
      </form>
      <Output
        output={output}
        setOutput={setOutput}
        isFlyingSpaghettiMonsterHere={isFlyingSpaghettiMonsterHere}
        setisFlyingSpaghettiMonsterHere={setisFlyingSpaghettiMonsterHere}
      />
    </div>
  );
};
export { InputForm as default };
