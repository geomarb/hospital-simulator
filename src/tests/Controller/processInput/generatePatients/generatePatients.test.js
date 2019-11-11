/* eslint-disable no-undef */
import generatePatients from '../../../../Controller/processInput/generatePatients';
import Drug from '../../../../models/Drug';
import HealthStatus from '../../../../models/HealthStatus';

it('Generate Patients: With Drug: Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthStatusListId = ['F'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = generatePatients(healthStatuses, drugs);
  const expectedResult = [{ healthStatusId: 'H' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthStatusListId = ['T'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = generatePatients(healthStatuses, drugs);
  const expectedResult = [{ healthStatusId: 'H' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthStatusListId = ['D'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = generatePatients(healthStatuses, drugs);
  const expectedResult = [{ healthStatusId: 'D' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthStatusListId = ['H'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = generatePatients(healthStatuses, drugs);
  const expectedResult = [{ healthStatusId: 'F' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const drugsListId = ['I', 'AN'];
  const healthStatusListId = ['T'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = generatePatients(healthStatuses, drugs);
  const expectedResult = [{ healthStatusId: 'T' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthStatusListId = ['F'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = generatePatients(healthStatuses, drugs);
  const expectedResult = [{ healthStatusId: 'H' }];

  expect(result).toStrictEqual(expectedResult);
});

it('Generate Patients: With Drug: Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthStatusListId = ['F'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);

  const result = generatePatients(healthStatuses, drugs);
  const expectedResult = [{ healthStatusId: 'X' }];

  expect(result).toStrictEqual(expectedResult);
});
