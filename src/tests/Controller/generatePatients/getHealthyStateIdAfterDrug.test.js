/* eslint-disable no-undef */
import { getHealthyStateIdAfterDrug } from '../../../Controller/generatePatients';
import getSideEffect from '../../../Controller/getSideEffect';
import loadDrugs from '../../../Controller/loadData/loadDrugs';
import loadHealthyState from '../../../Controller/loadData/loadHealthyStates';

it('Healthy State after Drug - Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthyStateListId = ['F'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;

  const result = getHealthyStateIdAfterDrug(healthyState, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Healthy State after Drug - Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthyStateListId = ['T'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;

  const result = getHealthyStateIdAfterDrug(healthyState, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Healthy State Id After Drug and Side Effect - Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthyStateListId = ['D'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;

  const result = getHealthyStateIdAfterDrug(healthyState, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'D';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Healthy State Id After Drug and Side Effect - Diabetic subject from die without insulin', () => {
  const drugsListId = ['AS'];
  const healthyStateListId = ['D'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;

  const result = getHealthyStateIdAfterDrug(healthyState, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});


it('Get Healthy State Id After Drug and Side Effect - If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthyStateListId = ['H'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;

  const result = getHealthyStateIdAfterDrug(healthyState, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'F';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Healthy State Id After Drug and Side Effect - Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthyStateListId = ['F'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;

  const result = getHealthyStateIdAfterDrug(healthyState, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Healthy State Id After Drug and Side Effect - Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthyStateListId = ['D'];

  const healthyStateList = loadHealthyState(healthyStateListId);
  const [healthyState] = healthyStateList;

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;

  const result = getHealthyStateIdAfterDrug(healthyState, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});
