/* eslint-disable no-undef */
import loadHealthyStates from '../../../Controller/loadData/loadHealthyStates';

it('Find Healthy States', () => {
  const healthyStateListId = ['F', 'H', 'D', 'T', 'X'];
  const result = loadHealthyStates(healthyStateListId);
  const expectedResult = [
    { id: 'F', description: 'Fever', isCurable: true },
    { id: 'H', description: 'Healthy', isCurable: true },
    { id: 'D', description: 'Diabetes', isCurable: false },
    { id: 'T', description: 'Tuberculosis', isCurable: true },
    { id: 'X', description: 'Dead', isCurable: false }];
  expect(result).toStrictEqual(expectedResult);
});

it('NOT Find Healthy States', () => {
  const healthyStateListId = [];
  const result = loadHealthyStates(healthyStateListId);
  const expectedResult = [];
  expect(result).toStrictEqual(expectedResult);
});
