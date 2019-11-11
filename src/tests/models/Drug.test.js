/* eslint-disable no-undef */
/* eslint-disable no-undef */
import Drug from '../../models/Drug';

it('Load Drugs', () => {
  const drugListId = ['AS', 'AN', 'I', 'P'];
  const result = Drug.loadFromListOfIDs(drugListId);
  const expectedResult = [{
    id: 'AS',
    description: 'Aspirin',
    treatHealthStateId: 'F',
    sideEffect: { mixedWithDrugId: 'P', newHealthStatusId: 'X' },
  },
  {
    id: 'AN',
    description: 'Antibiotic',
    treatHealthStateId: 'T',
    sideEffect:
    {
      mixedWithDrugId: 'I',
      currentHealthStatusId: 'H',
      newHealthStatusId: 'F',
    },
  },
  {
    id: 'I',
    description: 'Insulin',
    treatHealthStateId: 'D',
    sideEffect:
    {
      mixedWithDrugId: 'AN',
      currentHealthStatusId: 'H',
      newHealthStatusId: 'F',
    },
  },
  {
    id: 'P',
    description: 'Paracetamol',
    treatHealthStateId: 'F',
    sideEffect: { mixedWithDrugId: 'AS', newHealthStatusId: 'X' },
  }];
  expect(result).toStrictEqual(expectedResult);
});

it('NOT Load Drugs', () => {
  const drugListId = [];
  const result = Drug.loadFromListOfIDs(drugListId);
  const expectedResult = [];
  expect(result).toStrictEqual(expectedResult);
});

it('Parameter is Drug', () => {
  const param = 'AN';
  const result = Drug.isDrug(param);
  const expectedResult = true;
  expect(result).toStrictEqual(expectedResult);
});

it('Parameter is NOT Drug', () => {
  const param = 'Z';
  const result = Drug.isDrug(param);
  const expectedResult = false;
  expect(result).toStrictEqual(expectedResult);
});
