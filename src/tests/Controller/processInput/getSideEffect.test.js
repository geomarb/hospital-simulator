/* eslint-disable no-undef */
import getSideEffect from '../../../Controller/processInput/getSideEffectFromDrugs';
import Drug from '../../../models/Drug';

it('Get Side Effect for for Insulin and Antibiotic', () => {
  const drugListId = ['I', 'AN'];
  const drugs = Drug.loadFromListOfIDs(drugListId);

  const result = getSideEffect(drugs);

  const resultExpected = {
    mixedWithDrugId: 'I',
    currentHealthStatusId: 'H',
    newHealthStatusId: 'F',
  };

  expect(result).toStrictEqual(resultExpected);
});

it('Get Side Effect for for Antibiotic and Insulin', () => {
  const drugListId = ['AN', 'I'];

  const drugs = Drug.loadFromListOfIDs(drugListId);

  const result = getSideEffect(drugs);
  const resultExpected = {
    mixedWithDrugId: 'AN',
    currentHealthStatusId: 'H',
    newHealthStatusId: 'F',
  };

  expect(result).toStrictEqual(resultExpected);
});

it('Get side effect for Paracetamol and Aspirin', () => {
  const drugListId = ['P', 'AS'];

  const drugs = Drug.loadFromListOfIDs(drugListId);

  const result = getSideEffect(drugs);
  const resultExpected = {
    mixedWithDrugId: 'P',
    newHealthStatusId: 'X',
  };

  expect(result).toStrictEqual(resultExpected);
});

it('DO NOT Get side effect for Paracetamol', () => {
  const drugListId = ['P'];
  const drugs = Drug.loadFromListOfIDs(drugListId);
  const result = getSideEffect(drugs);
  const resultExpected = null;
  expect(result).toStrictEqual(resultExpected);
});

it('DO NOT Get side effect for Aspirin and Antibiotic', () => {
  const drugListId = ['AS', 'AN'];
  const drugs = Drug.loadFromListOfIDs(drugListId);
  const result = getSideEffect(drugs);
  const resultExpected = null;
  expect(result).toStrictEqual(resultExpected);
});

it('DO NOT Get side effect for Paracetamol and Antibiotic', () => {
  const drugListId = ['P', 'AN'];
  const drugs = Drug.loadFromListOfIDs(drugListId);
  const result = getSideEffect(drugs);
  const resultExpected = null;
  expect(result).toStrictEqual(resultExpected);
});
