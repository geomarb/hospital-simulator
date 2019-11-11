/* eslint-disable no-undef */
import processInput, {
  splitInput,
} from '../../../Controller/processInput';

it('Process input: With Drug: Aspirin cures Fever', () => {
  const input = 'F AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthStatusId: 'H' }],
    output: 'F:0,H:1,D:0,T:0,X:0',
    drugIdList: ['AS'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Antibiotic cures Tuberculosis', () => {
  const input = 'T AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthStatusId: 'H' }],
    output: 'F:0,H:1,D:0,T:0,X:0',
    drugIdList: ['AN'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Insulin prevents diabetic subject from dying, does not cure Diabetes', () => {
  const input = 'D I';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthStatusId: 'D' }],
    output: 'F:0,H:0,D:1,T:0,X:0',
    drugIdList: ['I'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: If insulin is mixed with antibiotic, healthy people catch Fever', () => {
  const input = 'H I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthStatusId: 'F' }],
    output: 'F:1,H:0,D:0,T:0,X:0',
    drugIdList: ['I', 'AN'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: If insulin is mixed with antibiotic, not affect Tuberculosis', () => {
  const input = 'T I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthStatusId: 'T' }],
    output: 'F:0,H:0,D:0,T:1,X:0',
    drugIdList: ['I', 'AN'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Paracetamol cures Fever', () => {
  const input = 'F P';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthStatusId: 'H' }],
    output: 'F:0,H:1,D:0,T:0,X:0',
    drugIdList: ['P'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: With Drug: Paracetamol kills subject if mixed with aspirin', () => {
  const input = 'H P,AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [{ healthStatusId: 'X' }],
    output: 'F:0,H:0,D:0,T:0,X:1',
    drugIdList: ['P', 'AS'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D, D AN"', () => {
  const input = 'D,D AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'X' },
      { healthStatusId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:2',
    drugIdList: ['AN'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "F,F P"', () => {
  const input = 'F,F P';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'H' },
      { healthStatusId: 'H' },
    ],
    output: 'F:0,H:2,D:0,T:0,X:0',
    drugIdList: ['P'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "F"', () => {
  const input = 'F';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'F' },
    ],
    output: 'F:1,H:0,D:0,T:0,X:0',
    drugIdList: [],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "T"', () => {
  const input = 'T';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'T' },
    ],
    output: 'F:0,H:0,D:0,T:1,X:0',
    drugIdList: [],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D" diabet without insulin should die', () => {
  const input = 'D';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:1',
    drugIdList: [],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,D" diabet without insulin should die', () => {
  const input = 'D,D';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'X' },
      { healthStatusId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:2',
    drugIdList: [],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,D I" diabet without insulin should die', () => {
  const input = 'D,D I';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'D' },
      { healthStatusId: 'D' },
    ],
    output: 'F:0,H:0,D:2,T:0,X:0',
    drugIdList: ['I'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,D I" diabet with insulin save patient', () => {
  const input = 'D,D I';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'D' },
      { healthStatusId: 'D' },
    ],
    output: 'F:0,H:0,D:2,T:0,X:0',
    drugIdList: ['I'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "F I,AN" ', () => {
  const input = 'F I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'F' },
    ],
    output: 'F:1,H:0,D:0,T:0,X:0',
    drugIdList: ['I', 'AN'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D I,AN" ', () => {
  const input = 'D I,AN';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'D' },
    ],
    output: 'F:0,H:0,D:1,T:0,X:0',
    drugIdList: ['I', 'AN'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D I,AN" ', () => {
  const input = 'D P,AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:1',
    drugIdList: ['P', 'AS'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "D,H,F P,AS" ', () => {
  const input = 'D,H,F P,AS';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'X' },
      { healthStatusId: 'X' },
      { healthStatusId: 'X' },
    ],
    output: 'F:0,H:0,D:0,T:0,X:3',
    drugIdList: ['P', 'AS'],
    isFlyingSpaghettiMonsterHere: false,
  };

  expect(result).toStrictEqual(expectedResult);
});

it('Process input: test input "H" ', () => {
  const input = 'H';

  const result = processInput(input);
  const expectedResult = {
    patients: [
      { healthStatusId: 'H' },
    ],
    output: 'F:0,H:1,D:0,T:0,X:0',
    drugIdList: [],
    isFlyingSpaghettiMonsterHere: false,
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
  const expectedResult = { error: 'Invalid Health Status: "L"' };

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
  const expectedResult = { error: 'Invalid Health Status: "Q"' };

  expect(result).toStrictEqual(expectedResult);
});

it('Clean Input Param: Return an empty array', () => {
  const input = '';

  const result = splitInput(input);
  const expectedResult = [];

  expect(result).toStrictEqual(expectedResult);
});

it('Clean Input Param: Return an array', () => {
  const input = 'D,X I,AS';

  const result = splitInput(input);
  const expectedResult = ['D,X', 'I,AS'];

  expect(result).toEqual(expectedResult);
});

it('Clean Input Param: Return an array', () => {
  const input = 'D,X I,AS T,S';

  const expectedResult = ['D,X', 'I,AS', 'T,S'];
  const result = splitInput(input);

  expect(result).toEqual(expectedResult);
});
