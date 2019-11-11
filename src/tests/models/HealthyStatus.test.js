/* eslint-disable no-undef */
/* eslint-disable no-undef */
import HealthStatus from '../../models/HealthStatus';

it('Find Health Statuses', () => {
  const healthStatusListId = ['F', 'H', 'D', 'T', 'X'];
  const result = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const expectedResult = [
    { id: 'F', description: 'Fever', isCurable: true },
    { id: 'H', description: 'Healthy', isCurable: true },
    { id: 'D', description: 'Diabetes', isCurable: false },
    { id: 'T', description: 'Tuberculosis', isCurable: true },
    { id: 'X', description: 'Dead', isCurable: false }];
  expect(result).toStrictEqual(expectedResult);
});

it('NOT Find Health Statuses', () => {
  const healthStatusListId = [];
  const result = HealthStatus.loadFromListOfIDs(healthStatusListId);
  const expectedResult = [];
  expect(result).toStrictEqual(expectedResult);
});

it('Parameter is Health Status type', () => {
  const param = 'F';
  const result = HealthStatus.isHealthStatus(param);
  const expectedResult = true;
  expect(result).toStrictEqual(expectedResult);
});

it('Parameter is NOT Health Status type', () => {
  const param = 'A';
  const result = HealthStatus.isHealthStatus(param);
  const expectedResult = false;
  expect(result).toStrictEqual(expectedResult);
});
