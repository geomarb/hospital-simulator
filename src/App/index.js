import React from 'react';
import Dashboard from '../Components/Dashboard';
import './styles.css';
import HealthStatus from '../models/HealthStatus';
import Drug from '../models/Drug';
import processInput from '../Controller/processInput';

const App = () => (
  <div className="App">
    <Dashboard
      healthStatuses={HealthStatus.loadAll()}
      drugs={Drug.loadAll()}
      processInput={processInput}
    />
  </div>
);

export { App as default };
