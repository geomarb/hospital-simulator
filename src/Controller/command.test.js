import { healthyStates } from '../data/healthyState.json'
import executeCommand, {
  isType,
  findWrongParamId,
  formatedResult,
  checkParams,
  processSideEffect
} from './command'
// import { drugs } from '../data/drugs.json'
// import { sideEffects } from '../data/sideEffects.json'


it('Find correct Healthy State', () => {
  expect(isType('H', healthyStates)).toEqual(true)
  expect(isType('Q', healthyStates)).toEqual(false)
})

it('Find wrong Param ID', () => {
  expect(findWrongParamId(['H', 'D'], healthyStates)).toBe(undefined)
  expect(findWrongParamId(['H', 'Q'], healthyStates)).toBe('Q')
})

it('Update result', () => {
  const patients = [
    { "state": "H" },
    { "state": "H" },
    { "state": "F" },
    { "state": "D" },
    { "state": "T" },
    { "state": "X" }]
  expect(formatedResult(patients)).toBe("F:1,H:2,D:1,T:1,X:1")
})

it('Execute Commands', () => {

  expect(executeCommand('F,F P')).toEqual({ "newPatients": [{ "state": "H" }, { "state": "H" }], "newResult": "F:0,H:2,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["P"] })
  expect(executeCommand('F')).toEqual({ "newPatients": [{ "state": "F" }], "newResult": "F:1,H:0,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": [] })
  expect(executeCommand('F P')).toEqual({ "newPatients": [{ "state": "H" }], "newResult": "F:0,H:1,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["P"] })
  expect(executeCommand('F AS')).toEqual({ "newPatients": [{ "state": "H" }], "newResult": "F:0,H:1,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["AS"] })
  expect(executeCommand('T')).toEqual({ "newPatients": [{ "state": "T" }], "newResult": "F:0,H:0,D:0,T:1,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": [] })
  expect(executeCommand('T AN')).toEqual({ "newPatients": [{ "state": "H" }], "newResult": "F:0,H:1,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["AN"] })
  expect(executeCommand('D')).toEqual({ "newPatients": [{ "state": "X" }], "newResult": "F:0,H:0,D:0,T:0,X:1", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": [] })
  expect(executeCommand('D,D')).toEqual({ "newPatients": [{ "state": "X" }, { "state": "X" }], "newResult": "F:0,H:0,D:0,T:0,X:2", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": [] })
  expect(executeCommand('D,D I')).toEqual({ "newPatients": [{ "state": "D" }, { "state": "D" }], "newResult": "F:0,H:0,D:2,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["I"] })
  expect(executeCommand('H I,AN')).toEqual({ "newPatients": [{ "state": "F" }], "newResult": "F:1,H:0,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["I", "AN"] })
  expect(executeCommand('F I,AN')).toEqual({ "newPatients": [{ "state": "F" }], "newResult": "F:1,H:0,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["I", "AN"] })
  expect(executeCommand('D I,AN')).toEqual({ "newPatients": [{ "state": "D" }], "newResult": "F:0,H:0,D:1,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["I", "AN"] })
  expect(executeCommand('D I')).toEqual({ "newPatients": [{ "state": "D" }], "newResult": "F:0,H:0,D:1,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["I"] })
  expect(executeCommand('H P,AS')).toEqual({ "newPatients": [{ "state": "X" }], "newResult": "F:0,H:0,D:0,T:0,X:1", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["P", "AS"] })
  expect(executeCommand('D P,AS')).toEqual({ "newPatients": [{ "state": "X" }], "newResult": "F:0,H:0,D:0,T:0,X:1", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["P", "AS"] })
  expect(executeCommand('D,H,F P,AS')).toEqual({ "newPatients": [{ "state": "X" }, { "state": "X" }, { "state": "X" }], "newResult": "F:0,H:0,D:0,T:0,X:3", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": ["P", "AS"] })
  expect(executeCommand('H')).toEqual({ "newPatients": [{ "state": "H" }], "newResult": "F:0,H:1,D:0,T:0,X:0", "flyingSpaghettiMonsterWasHere": false, "givenDrugs": [] })
  //command error
  expect(executeCommand('')).toEqual({ "error": "No command to be executed" })
  expect(executeCommand('H AS P')).toEqual({ "error": "Invalid parameters: P" })
  expect(executeCommand('L AS')).toEqual({ "error": "Invalid Healthy State: L" })
  expect(executeCommand('H L')).toEqual({ "error": "Invalid Drug: L" })
  expect(executeCommand('A A A')).toEqual({ "error": "Invalid parameters: A" })
  expect(executeCommand('Q')).toEqual({ "error": "Invalid Healthy State: Q" })

})

it('Process side Effect', () => {

})