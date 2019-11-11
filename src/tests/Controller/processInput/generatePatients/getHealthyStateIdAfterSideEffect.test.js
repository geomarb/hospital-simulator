/* eslint-disable no-undef */
import { getHealthStatusIdAfterSideEffect } from '../../../../Controller/processInput/generatePatients';
import getSideEffect from '../../../../Controller/processInput/getSideEffectFromDrugs';
import Drug from '../../../../models/Drug';

it('Get Health Status Id After Side Effect - If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const healthStatusId = 'H';
  const drugsListId = ['I', 'AN'];

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthStatusIdAfterSideEffect(healthStatusId, sideEffect);
  const expectedResult = 'F';

  expect(result).toStrictEqual(expectedResult);
});

it('Side Effect:Paracetamol kills subject if mixed with aspirin (Tuberculosis)', () => {
  const healthStatusId = 'T';
  const drugsListId = ['P', 'AS'];

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthStatusIdAfterSideEffect(healthStatusId, sideEffect);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});


it('Side Effect: Paracetamol kills subject if mixed with aspirin (Healthy)', () => {
  const healthStatusId = 'H';
  const drugsListId = ['P', 'AS'];

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthStatusIdAfterSideEffect(healthStatusId, sideEffect);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});

it('Side Effect: Tuberculosis should not change after take Insulin and Antibiotic', () => {
  const healthStatusId = 'T';
  const drugsListId = ['I', 'AN'];

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const result = getHealthStatusIdAfterSideEffect(healthStatusId, sideEffect);
  const expectedResult = 'T';

  expect(result).toStrictEqual(expectedResult);
});
