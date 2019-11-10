/* eslint-disable no-undef */
import { getHealthyStateIdAfterSideEffect } from '../../../Controller/generatePatients';
import getSideEffect from '../../../Controller/getSideEffect';
import loadDrugs from '../../../Controller/loadData/loadDrugs';

it('Get Healthy State Id After Side Effect - If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const healthyStateId = 'H';
  const drugsListId = ['I', 'AN'];

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthyStateIdAfterSideEffect(healthyStateId, sideEffect);
  const expectedResult = 'F';

  expect(result).toStrictEqual(expectedResult);
});

it('Side Effect:Paracetamol kills subject if mixed with aspirin (Tuberculosis)', () => {
  const healthyStateId = 'T';
  const drugsListId = ['P', 'AS'];

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthyStateIdAfterSideEffect(healthyStateId, sideEffect);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});


it('Side Effect: Paracetamol kills subject if mixed with aspirin (Healthy)', () => {
  const healthyStateId = 'H';
  const drugsListId = ['P', 'AS'];

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthyStateIdAfterSideEffect(healthyStateId, sideEffect);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});

it('Side Effect: Tuberculosis should not change after take Insulin and Antibiotic', () => {
  const healthyStateId = 'T';
  const drugsListId = ['I', 'AN'];

  const drugs = loadDrugs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthyStateIdAfterSideEffect(healthyStateId, sideEffect);
  const expectedResult = 'T';

  expect(result).toStrictEqual(expectedResult);
});
