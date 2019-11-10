/* eslint-disable no-undef */
import processInput, {
  removeExtraSpacesAndSplitInput,
} from '../../Controller/processInput';

it('Process input: With Drug: Aspirin cures Fever', () => {
  const input = 'F AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthyStateId: 'H' }],
    output: 'F:0,H:1,D:0,T:0,X:0',
    givenDrugs: ['AS'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Antibiotic cures Tuberculosis', () => {
  const input = 'T AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthyStateId: 'H' }],
    output: 'F:0,H:1,D:0,T:0,X:0',
    givenDrugs: ['AN'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const input = 'D I';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthyStateId: 'D' }],
    output: 'F:0,H:0,D:1,T:0,X:0',
    givenDrugs: ['I'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const input = 'H I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthyStateId: 'F' }],
    output: 'F:1,H:0,D:0,T:0,X:0',
    givenDrugs: ['I', 'AN'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const input = 'T I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthyStateId: 'T' }],
    output: 'F:0,H:0,D:0,T:1,X:0',
    givenDrugs: ['I', 'AN'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Paracetamol cures Fever', () => {
  const input = 'F P';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthyStateId: 'H' }],
    output: 'F:0,H:1,D:0,T:0,X:0',
    givenDrugs: ['P'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Paracetamol kills subject if mixed with aspirin', () => {
  const input = 'H P,AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthyStateId: 'X' }],
    output: 'F:0,H:0,D:0,T:0,X:1',
    givenDrugs: ['P', 'AS'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D, D AN"', () => {
  const input = 'D,D AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'X' },
      { healthyStateId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:2',
    givenDrugs: ['AN'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "F,F P"', () => {
  const input = 'F,F P';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'H' },
      { healthyStateId: 'H' },
    ],
    output: 'F:0,H:2,D:0,T:0,X:0',
    givenDrugs: ['P'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "F"', () => {
  const input = 'F';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'F' },
    ],
    output: 'F:1,H:0,D:0,T:0,X:0',
    givenDrugs: [],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "T"', () => {
  const input = 'T';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'T' },
    ],
    output: 'F:0,H:0,D:0,T:1,X:0',
    givenDrugs: [],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D" diabet without insulin should die', () => {
  const input = 'D';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:1',
    givenDrugs: [],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,D" diabet without insulin should die', () => {
  const input = 'D,D';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'X' },
      { healthyStateId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:2',
    givenDrugs: [],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,D I" diabet without insulin should die', () => {
  const input = 'D,D I';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'D' },
      { healthyStateId: 'D' },
    ],
    output: 'F:0,H:0,D:2,T:0,X:0',
    givenDrugs: ['I'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,D I" diabet with insulin save patient', () => {
  const input = 'D,D I';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'D' },
      { healthyStateId: 'D' },
    ],
    output: 'F:0,H:0,D:2,T:0,X:0',
    givenDrugs: ['I'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "F I,AN" ', () => {
  const input = 'F I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'F' },
    ],
    output: 'F:1,H:0,D:0,T:0,X:0',
    givenDrugs: ['I', 'AN'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D I,AN" ', () => {
  const input = 'D I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'D' },
    ],
    output: 'F:0,H:0,D:1,T:0,X:0',
    givenDrugs: ['I', 'AN'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D I,AN" ', () => {
  const input = 'D P,AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:1',
    givenDrugs: ['P', 'AS'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,H,F P,AS" ', () => {
  const input = 'D,H,F P,AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'X' },
      { healthyStateId: 'X' },
      { healthyStateId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:3',
    givenDrugs: ['P', 'AS'],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "H" ', () => {
  const input = 'H';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthyStateId: 'H' },
    ],
    output: 'F:0,H:1,D:0,T:0,X:0',
    givenDrugs: [],
    flyingSpaghettiMonsterWasHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input error message "" ', () => {
  const input = '';

  const result = processInput(input);
  const expectedResult = { error: 'No command to be executed' };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input error message "H AS P" ', () => {
  const input = 'H AS P';

  const result = processInput(input);
  const expectedResult = { error: 'Invalid parameters: "P"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input error message "L AS" ', () => {
  const input = 'L AS';

  const result = processInput(input);
  const expectedResult = { error: 'Invalid Healthy State: "L"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input error message "H L" ', () => {
  const input = 'H L';

  const result = processInput(input);
  const expectedResult = { error: 'Invalid Drug: "L"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input error message "A A A" ', () => {
  const input = 'A A A';

  const result = processInput(input);
  const expectedResult = { error: 'Invalid parameters: "A"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input error message "Q" ', () => {
  const input = 'Q';

  const result = processInput(input);
  const expectedResult = { error: 'Invalid Healthy State: "Q"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Clean Input Param: Return an empty array', () => {
  const input = '';

  const result = removeExtraSpacesAndSplitInput(input);
  const expectedResult = [];

  expect(result).toStrictEqual(expectedResult);
});

it('Clean Input Param: Return an array', () => {
  const input = 'D,X I,AS';

  const result = removeExtraSpacesAndSplitInput(input);
  const expectedResult = ['D,X', 'I,AS'];

  expect(result).toEqual(expectedResult);
});

it('Clean Input Param: Return an array', () => {
  const input = 'D,X I,AS T,S';

  const expectedResult = ['D,X', 'I,AS', 'T,S'];
  const result = removeExtraSpacesAndSplitInput(input);

  expect(result).toEqual(expectedResult);
});
