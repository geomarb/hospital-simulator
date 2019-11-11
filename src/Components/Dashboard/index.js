import React, { useState } from 'react';
import './styles.css';
import HealthStatuses from './HealthStatuses';
import InputForm from './InputForm';
import Drugs from './Drugs';

import Help from './Help';

const Dashboard = ({ healthStatuses, drugs, processInput }) => {
  const [patients, setPatients] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [givenDrugs, setGivenDrugs] = useState([]);

  return (
    <div className="dashboard">
      <header>
        <h1>Hospital Simulator</h1>
      </header>
      <HealthStatuses
        patients={patients || []}
        healthStatuses={healthStatuses}
      />
      <Drugs
        givenDrugs={givenDrugs || []}
        drugs={drugs}
      />
      <InputForm
        setPatients={setPatients}
        setShowHelp={setShowHelp}
        setGivenDrugs={setGivenDrugs}
        showHelp={showHelp}
        processInput={processInput}
      />
      <Help showHelp={showHelp} setShowHelp={setShowHelp} />
    </div>
  );
};
export { Dashboard as default };
