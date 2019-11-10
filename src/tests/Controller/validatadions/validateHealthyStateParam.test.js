/* eslint-disable no-undef */
import findWrongHealthyStateParam, {
  isHealthyState,
} from '../../../Controller/validations/validateHealthyStateParam';


it('Parameter is Healthy State type', () => {
  const param = 'F';
  const result = isHealthyState(param);
  const expectedResult = true;
  expect(result).toStrictEqual(expectedResult);
});

it('Parameter is NOT Healthy State type', () => {
  const param = 'A';
  const result = isHealthyState(param);
  const expectedResult = false;
  expect(result).toStrictEqual(expectedResult);
});


it('Wrong Healthy State parameter found', () => {
  const healthyStateParamsSplitted = ['H', 'A'];
  const result = findWrongHealthyStateParam(healthyStateParamsSplitted);
  const expectedResult = 'A';
  expect(result).toStrictEqual(expectedResult);
});

it('Wrong Healthy State parameter NOT found', () => {
  const healthyStateParamsSplitted = ['F', 'H'];
  const result = findWrongHealthyStateParam(healthyStateParamsSplitted);
  const expectedResult = undefined;
  expect(result).toStrictEqual(expectedResult);
});
