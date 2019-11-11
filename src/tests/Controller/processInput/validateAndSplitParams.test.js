/* eslint-disable no-undef */
import { splitInput } from '../../../Controller/processInput';
import validateAndSplitParams, {
  findWrongDrugParam,
  findWrongHealthStatusParam,
} from '../../../Controller/processInput/validateAndSplitParams';

it('Returns error: No command to be executed', () => {
  const command = '';

  const params = splitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'No command to be executed' };

  expect(result).toStrictEqual(expectedResult);
});


it('Returns Invalid parameters error message', () => {
  const command = 'A B C';

  const params = splitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: `Invalid parameters: "${params[2]}"` };

  expect(result).toStrictEqual(expectedResult);
});

it('Returns Miss Health Status command error message', () => {
  const command = 'A, B';

  const params = splitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'Missing Health Status command: "A,?"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Returns Miss Drug command error message', () => {
  const command = 'A B,';

  const params = splitInput(command);

  const result = validateAndSplitParams(params);

  const expectedResult = { error: 'Missing Drug command: "B,?"' };
  expect(result).toStrictEqual(expectedResult);
});

it('Returns Invalid Health Status error message', () => {
  const command = 'A B';

  const params = splitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'Invalid Health Status: "A"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Returns Invalid Drug error message', () => {
  const command = 'H A,B';

  const params = splitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = { error: 'Invalid Drug: "A"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Validate and split params', () => {
  const command = 'H,D,F,X,T AN,AS,P,I';

  const params = splitInput(command);

  const result = validateAndSplitParams(params);
  const expectedResult = {
    healthStatusIdList: ['H', 'D', 'F', 'X', 'T'],
    drugIdList: ['AN', 'AS', 'P', 'I'],
  };
  expect(result).toStrictEqual(expectedResult);
});

it('Wrong Drug parameter found', () => {
  const drugParamsSplitted = ['A', 'F'];
  const result = findWrongDrugParam(drugParamsSplitted);
  const expectedResult = 'A';
  expect(result).toStrictEqual(expectedResult);
});

it('Wrong Drug parameter NOT found', () => {
  const drugParamsSplitted = ['I', 'AN'];
  const result = findWrongDrugParam(drugParamsSplitted);
  const expectedResult = undefined;
  expect(result).toStrictEqual(expectedResult);
});

it('Wrong Health Status parameter found', () => {
  const healthStatusParamsSplitted = ['H', 'A'];
  const result = findWrongHealthStatusParam(healthStatusParamsSplitted);
  const expectedResult = 'A';
  expect(result).toStrictEqual(expectedResult);
});

it('Wrong Health Status parameter NOT found', () => {
  const healthStatusParamsSplitted = ['F', 'H'];
  const result = findWrongHealthStatusParam(healthStatusParamsSplitted);
  const expectedResult = undefined;
  expect(result).toStrictEqual(expectedResult);
});
