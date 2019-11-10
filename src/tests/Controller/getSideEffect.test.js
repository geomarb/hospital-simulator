/* eslint-disable no-undef */
import getSideEffect from '../../Controller/getSideEffect';
import loadDrugs from '../../Controller/loadData/loadDrugs';

it('Get Side Effect for for Insulin and Antibiotic', () => {
  const drugListId = ['I', 'AN'];
  const drugs = loadDrugs(drugListId);

  const result = getSideEffect(drugs);

  const resultExpected = {
    mixedWithDrugId: 'I',
    currentHealthyStateId: 'H',
    newHealthyStateId: 'F',
  };

  expect(result).toStrictEqual(resultExpected);
});

it('Get Side Effect for for Antibiotic and Insulin', () => {
  const drugListId = ['AN', 'I'];

  const drugs = loadDrugs(drugListId);

  const result = getSideEffect(drugs);
  const resultExpected = {
    mixedWithDrugId: 'AN',
    currentHealthyStateId: 'H',
    newHealthyStateId: 'F',
  };

  expect(result).toStrictEqual(resultExpected);
});

it('Get side effect for Paracetamol and Aspirin', () => {
  const drugListId = ['P', 'AS'];

  const drugs = loadDrugs(drugListId);

  const result = getSideEffect(drugs);
  const resultExpected = {
    mixedWithDrugId: 'P',
    newHealthyStateId: 'X',
  };

  expect(result).toStrictEqual(resultExpected);
});

it('DO NOT Get side effect for Paracetamol', () => {
  const drugListId = ['P'];
  const drugs = loadDrugs(drugListId);
  const result = getSideEffect(drugs);
  const resultExpected = null;
  expect(result).toStrictEqual(resultExpected);
});

it('DO NOT Get side effect for Aspirin and Antibiotic', () => {
  const drugListId = ['AS', 'AN'];
  const drugs = loadDrugs(drugListId);
  const result = getSideEffect(drugs);
  const resultExpected = null;
  expect(result).toStrictEqual(resultExpected);
});

it('DO NOT Get side effect for Paracetamol and Antibiotic', () => {
  const drugListId = ['P', 'AN'];
  const drugs = loadDrugs(drugListId);
  const result = getSideEffect(drugs);
  const resultExpected = null;
  expect(result).toStrictEqual(resultExpected);
});
