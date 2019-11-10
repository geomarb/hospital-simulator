/* eslint-disable no-undef */
import { removeExtraSpacesAndSplitInput } from '../../../Controller/processInput';
import validateAndSplitParams from '../../../Controller/validations/validateAndSplitParams';

it('Returns error: No command to be executed', () => {
  const command = '';

  const params = removeExtraSpacesAndSplitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'No command to be executed' };

  expect(result).toStrictEqual(expectedResult);
});


it('Returns Invalid parameters error message', () => {
  const command = 'A B C';

  const params = removeExtraSpacesAndSplitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: `Invalid parameters: "${params[2]}"` };

  expect(result).toStrictEqual(expectedResult);
});

it('Returns Miss Healthy State command error message', () => {
  const command = 'A, B';

  const params = removeExtraSpacesAndSplitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'Missing Healthy State command: "A,?"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Returns Miss Drug command error message', () => {
  const command = 'A B,';

  const params = removeExtraSpacesAndSplitInput(command);

  const result = validateAndSplitParams(params);

  const expectedResult = { error: 'Missing Drug command: "B,?"' };
  expect(result).toStrictEqual(expectedResult);
});

it('Returns Invalid Healthy State error message', () => {
  const command = 'A B';

  const params = removeExtraSpacesAndSplitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'Invalid Healthy State: "A"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Returns Invalid Drug error message', () => {
  const command = 'H A,B';

  const params = removeExtraSpacesAndSplitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'Invalid Drug: "A"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Validate and split params', () => {
  const command = 'H,D,F,X,T AN,AS,P,I';

  const params = removeExtraSpacesAndSplitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = {
    healthyStateListId: ['H', 'D', 'F', 'X', 'T'],
    drugIdList: ['AN', 'AS', 'P', 'I'],
  };

  expect(result).toStrictEqual(expectedResult);
});
