import { healthyStates } from '../data/healthyState.json';

// format output text to be showed as requested... ex: F:0,H:3,D:0,T:0,X:0
// run all states and get the quantity of patients found for each state
// add ID and quantity to the result text and remove last comma
const formatOutput = (patients) => {
  let output = '';

  healthyStates.forEach((healthyState) => {
    const patientsForHealthyState = patients.filter(
      (patient) => patient.healthyStateId === healthyState.id,
    );

    const quantityOfPatients = patientsForHealthyState.length;

    output += `${healthyState.id}:${quantityOfPatients},`;
  });

  output = output.slice(0, -1);

  return output;
};

export { formatOutput as default };
