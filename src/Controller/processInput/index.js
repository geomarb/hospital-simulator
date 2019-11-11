import validateAndSplitParams from './validateAndSplitParams';
import formatOutput from './formatOutput';
import generatePatients from './generatePatients';
import Drug from '../../models/Drug';
import HealthStatus from '../../models/HealthStatus';

const splitInput = (input) => {
  if (input === '') {
    return [];
  }
  const inputSplitted = input.split(' ');
  return inputSplitted;
};

const isFlyingSpaghettiMonsterHereNow = () => {
  const noodlyPowerLuckyNumber = 8;
  const flyingSpaghettiMonsterRandomNumber = Math.floor((Math.random() * 1000000) + 1);
  return flyingSpaghettiMonsterRandomNumber === noodlyPowerLuckyNumber;
};

const getIndexOfADeadPatient = (patients) => patients.map(
  (patient) => patient.healthStatusId,
).indexOf('X');

const processInput = (input) => {
  const inputSanitized = input.trim();
  const params = splitInput(inputSanitized);
  const {
    healthStatusIdList,
    drugIdList,
    error,
  } = validateAndSplitParams(params);

  if (error) return { error };

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusIdList);
  const drugs = Drug.loadFromListOfIDs(drugIdList);
  const patients = generatePatients(healthStatuses, drugs);

  const isFlyingSpaghettiMonsterHere = isFlyingSpaghettiMonsterHereNow();
  const indexOfADeadPatient = getIndexOfADeadPatient(patients);
  if (isFlyingSpaghettiMonsterHere && indexOfADeadPatient > -1) {
    patients[indexOfADeadPatient].healthStatusId = 'H';// resurrect a Dead Patient
  }

  const output = formatOutput(patients);
  return {
    patients,
    output,
    drugIdList,
    isFlyingSpaghettiMonsterHere,
  };
};

export {
  processInput as default,
  splitInput,
};
