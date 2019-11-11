import { healthStatuses } from '../../data/healthStatus.json';

// format output text to be showed as requested... ex: F:0,H:3,D:0,T:0,X:0
// run all states and get the quantity of patients found for each state
// add ID and quantity to the result text and remove last comma
const formatOutput = (patients) => {
  let output = '';

  healthStatuses.forEach((healthStatus) => {
    const patientsForHealthStatus = patients.filter(
      (patient) => patient.healthStatusId === healthStatus.id,
    );

    const quantityOfPatients = patientsForHealthStatus.length;

    output += `${healthStatus.id}:${quantityOfPatients},`;
  });

  output = output.slice(0, -1);

  return output;
};

export { formatOutput as default };
