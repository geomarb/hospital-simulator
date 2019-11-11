/* eslint-disable no-undef */
import { processDrugsToGetHealthStatusId } from '../../../../Controller/processInput/generatePatients';
import Drug from '../../../../models/Drug';
import HealthStatus from '../../../../models/HealthStatus';

it('Process Drugs: Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthStatusListId = ['F'];

  const healthStatusList = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = processDrugsToGetHealthStatusId(healthStatus, drugs);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthStatusListId = ['T'];

  const healthStatusList = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = processDrugsToGetHealthStatusId(healthStatus, drugs);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthStatusListId = ['D'];

  const healthStatusList = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = processDrugsToGetHealthStatusId(healthStatus, drugs);
  const expectedResult = 'D';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthStatusListId = ['H'];

  const healthStatusList = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = processDrugsToGetHealthStatusId(healthStatus, drugs);
  const expectedResult = 'F';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const drugsListId = ['I', 'AN'];
  const healthStatusListId = ['T'];

  const healthStatusList = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = processDrugsToGetHealthStatusId(healthStatus, drugs);
  const expectedResult = 'T';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthStatusListId = ['F'];

  const healthStatusList = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = processDrugsToGetHealthStatusId(healthStatus, drugs);
  const expectedResult = 'H';

  expect(result).toStrictEqual(expectedResult);
});

it('Process Drugs: Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthStatusListId = ['F'];

  const healthStatusList = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const [healthStatus] = healthStatusList;

  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = processDrugsToGetHealthStatusId(healthStatus, drugs);
  const expectedResult = 'X';

  expect(result).toStrictEqual(expectedResult);
});
