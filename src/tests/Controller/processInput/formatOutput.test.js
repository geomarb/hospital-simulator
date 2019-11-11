/* eslint-disable no-undef */
import formatOutput from '../../../Controller/processInput/formatOutput';
import generatePatients from '../../../Controller/processInput/generatePatients';
import Drug from '../../../models/Drug';
import HealthStatus from '../../../models/HealthStatus';

it('Output formated: With Drug: Aspirin cures Fever', () => {
  const drugsListId = ['AS'];
  const healthStatusListId = ['F'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const patients = generatePatients(healthStatuses, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:1,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Antibiotic cures Tuberculosis', () => {
  const drugsListId = ['AN'];
  const healthStatusListId = ['T'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const patients = generatePatients(healthStatuses, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:1,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const drugsListId = ['I'];
  const healthStatusListId = ['D'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const patients = generatePatients(healthStatuses, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:0,D:1,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const drugsListId = ['I', 'AN'];
  const healthStatusListId = ['H'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const patients = generatePatients(healthStatuses, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:1,H:0,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const drugsListId = ['I', 'AN'];
  const healthStatusListId = ['T'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const patients = generatePatients(healthStatuses, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:0,D:0,T:1,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Paracetamol cures Fever', () => {
  const drugsListId = ['P'];
  const healthStatusListId = ['F'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const patients = generatePatients(healthStatuses, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:1,D:0,T:0,X:0';

  expect(result).toStrictEqual(expectedResult);
});

it('Output formated: With Drug: Paracetamol kills subject if mixed with aspirin', () => {
  const drugsListId = ['P', 'AS'];
  const healthStatusListId = ['F'];

  const healthStatuses = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const drugs = Drug.loadFromListOfIDs(drugsListId);
  const patients = generatePatients(healthStatuses, drugs);

  const result = formatOutput(patients);
  const expectedResult = 'F:0,H:0,D:0,T:0,X:1';

  expect(result).toStrictEqual(expectedResult);
});
