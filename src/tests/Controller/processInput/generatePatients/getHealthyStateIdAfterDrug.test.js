/* eslint-disable no-undef */
import { getHealthStatusIdAfterDrug } from '../../../../Controller/processInput/generatePatients';
import getSideEffect from '../../../../Controller/processInput/getSideEffectFromDrugs';
import Drug from '../../../../models/Drug';
import HealthyStatus from '../../../../models/HealthStatus';

it('Health Status after Drug - Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthStatusListId = ['F'];

  const healthStatusList = HealthyStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthStatus.id : false;

  const result = getHealthStatusIdAfterDrug(healthStatus, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Health Status after Drug - Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthStatusListId = ['T'];

  const healthStatusList = HealthyStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthStatus.id : false;

  const result = getHealthStatusIdAfterDrug(healthStatus, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Health Status Id After Drug and Side Effect - Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthStatusListId = ['D'];

  const healthStatusList = HealthyStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthStatus.id : false;

  const result = getHealthStatusIdAfterDrug(healthStatus, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'D';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Health Status Id After Drug and Side Effect - Diabetic subject from die without insulin', () => {
  const drugsListId = ['AS'];
  const healthStatusListId = ['D'];

  const healthStatusList = HealthyStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);

  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthStatus.id : false;

  const result = getHealthStatusIdAfterDrug(healthStatus, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});


it('Get Health Status Id After Drug and Side Effect - If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthStatusListId = ['H'];

  const healthStatusList = HealthyStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthStatus.id : false;

  const result = getHealthStatusIdAfterDrug(healthStatus, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'F';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Health Status Id After Drug and Side Effect - Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthStatusListId = ['F'];

  const healthStatusList = HealthyStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthStatus.id : false;

  const result = getHealthStatusIdAfterDrug(healthStatus, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Get Health Status Id After Drug and Side Effect - Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthStatusListId = ['D'];

  const healthStatusList = HealthyStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const sideEffect = getSideEffect(drugs);
  const [drug] = drugs;

  const drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthStatus.id : false;

  const result = getHealthStatusIdAfterDrug(healthStatus, sideEffect, drugTreatsHealthySate);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});
