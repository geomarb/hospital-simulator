/* eslint-disable no-undef */
import { processDrugsToGetHealthyStateId } from '../../../Controller/generatePatients';
import loadDrugs from '../../../Controller/loadData/loadDrugs';
import loadHealthyState from '../../../Controller/loadData/loadHealthyStates';

it('Process Drugs: Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthyStateListId = ['F'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);

  const result = processDrugsToGetHealthyStateId(healthyState, drugs);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthyStateListId = ['T'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);

  const result = processDrugsToGetHealthyStateId(healthyState, drugs);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthyStateListId = ['D'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);

  const result = processDrugsToGetHealthyStateId(healthyState, drugs);
  const expectedResult = 'D';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthyStateListId = ['H'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);

  const result = processDrugsToGetHealthyStateId(healthyState, drugs);
  const expectedResult = 'F';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const drugsListId = ['I', 'AN'];
  const healthyStateListId = ['T'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);

  const result = processDrugsToGetHealthyStateId(healthyState, drugs);
  const expectedResult = 'T';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthyStateListId = ['F'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);

  const result = processDrugsToGetHealthyStateId(healthyState, drugs);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthyStateListId = ['F'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);

  const result = processDrugsToGetHealthyStateId(healthyState, drugs);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});
