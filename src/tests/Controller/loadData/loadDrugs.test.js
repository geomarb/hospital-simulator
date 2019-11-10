/* eslint-disable no-undef */
import loadDrugs from '../../../Controller/loadData/loadDrugs';

it('Load Drugs', () => {
  const drugListId = ['AS', 'AN', 'I', 'P'];
  const result = loadDrugs(drugListId);
  const expectedResult = [{
    id: 'AS',
    description: 'Aspirin',
    treatHealthStateId: 'F',
    sideEffect: { mixedWithDrugId: 'P', newHealthyStateId: 'X' },
  },
  {
    id: 'AN',
    description: 'Antibiotic',
    treatHealthStateId: 'T',
    sideEffect:
    {
      mixedWithDrugId: 'I',
      currentHealthyStateId: 'H',
      newHealthyStateId: 'F',
    },
  },
  {
    id: 'I',
    description: 'Insulin',
    treatHealthStateId: 'D',
    sideEffect:
    {
      mixedWithDrugId: 'AN',
      currentHealthyStateId: 'H',
      newHealthyStateId: 'F',
    },
  },
  {
    id: 'P',
    description: 'Paracetamol',
    treatHealthStateId: 'F',
    sideEffect: { mixedWithDrugId: 'AS', newHealthyStateId: 'X' },
  }];
  expect(result).toStrictEqual(expectedResult);
});

it('NOT Load Drugs', () => {
  const drugListId = [];
  const result = loadDrugs(drugListId);
  const expectedResult = [];
  expect(result).toStrictEqual(expectedResult);
});
