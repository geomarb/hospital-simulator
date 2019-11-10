/* eslint-disable no-undef */
import formatOutput from '../../Controller/formatOutput';
import generatePatients from '../../Controller/generatePatients';
import loadDrugs from '../../Controller/loadData/loadDrugs';
import loadHealthyState from '../../Controller/loadData/loadHealthyStates';

it('Output formated: With Drug: Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthyStateListId = ['F'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);
  const patients = generatePatients(healthyStates, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:1,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthyStateListId = ['T'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);
  const patients = generatePatients(healthyStates, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:1,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthyStateListId = ['D'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);
  const patients = generatePatients(healthyStates, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:0,D:1,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthyStateListId = ['H'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);
  const patients = generatePatients(healthyStates, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:1,H:0,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const drugsListId = ['I', 'AN'];
  const healthyStateListId = ['T'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);
  const patients = generatePatients(healthyStates, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:0,D:0,T:1,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthyStateListId = ['F'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);
  const patients = generatePatients(healthyStates, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:1,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthyStateListId = ['F'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);
  const patients = generatePatients(healthyStates, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:0,D:0,T:0,X:1';

  expect(result).toStrictEqual(expectedResult);
});
