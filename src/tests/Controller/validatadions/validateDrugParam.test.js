/* eslint-disable no-undef */
import findWrongDrugParam, {
  isDrug,
} from '../../../Controller/validations/validateDrugParam';

it('Parameter is Drug', () => {
  const param = 'AN';
  const result = isDrug(param);
  const expectedResult = true;
  expect(result).toStrictEqual(expectedResult);
});

it('Parameter is NOT Drug', () => {
  const param = 'Z';
  const result = isDrug(param);
  const expectedResult = false;
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
