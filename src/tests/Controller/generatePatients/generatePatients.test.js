/* eslint-disable no-undef */
import generatePatients from '../../../Controller/generatePatients';
import loadDrugs from '../../../Controller/loadData/loadDrugs';
import loadHealthyState from '../../../Controller/loadData/loadHealthyStates';

it('Generate Patients: With Drug: Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthyStateListId = ['F'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);

  const result = generatePatients(healthyStates, drugs);
  const expectedResult = [{ healthyStateId: 'H' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthyStateListId = ['T'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);

  const result = generatePatients(healthyStates, drugs);
  const expectedResult = [{ healthyStateId: 'H' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthyStateListId = ['D'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);

  const result = generatePatients(healthyStates, drugs);
  const expectedResult = [{ healthyStateId: 'D' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthyStateListId = ['H'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);

  const result = generatePatients(healthyStates, drugs);
  const expectedResult = [{ healthyStateId: 'F' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const drugsListId = ['I', 'AN'];
  const healthyStateListId = ['T'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);

  const result = generatePatients(healthyStates, drugs);
  const expectedResult = [{ healthyStateId: 'T' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthyStateListId = ['F'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);

  const result = generatePatients(healthyStates, drugs);
  const expectedResult = [{ healthyStateId: 'H' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthyStateListId = ['F'];

  const healthyStates = loadHealthyState(healthyStateListId);
  const drugs = loadDrugs(drugsListId);

  const result = generatePatients(healthyStates, drugs);
  const expectedResult = [{ healthyStateId: 'X' }];

  expect(result).toStrictEqual(expectedResult);
});
