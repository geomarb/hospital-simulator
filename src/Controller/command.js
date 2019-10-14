import { healthyStates } from '../data/healthyState.json'
import { drugs } from '../data/drug.json'
import { sideEffects } from '../data/drugSideEffect.json'

export default function executeCommand(command) {
  //remove extra spaces and separate command in params by space
  const params = command.trim().split(" ")
  const healthyStateParams = params.length > 0 ? params[0].split(',') : []
  const drugParams = params.length === 2 ? params[1].split(',') : []
  const paramErrorMessage = checkParams(params)
  if (paramErrorMessage) {
    return { error: paramErrorMessage }
  }

  const wrongHealthyParamId = findWrongParamId(healthyStateParams, healthyStates)
  if (wrongHealthyParamId) {
    return { error: `Invalid Healthy State: ${wrongHealthyParamId}` }
  }

  const wrongDrugId = findWrongParamId(drugParams, drugs)
  if (wrongDrugId) {
    return { error: `Invalid Drug: ${wrongDrugId}` }
  }

  let patients = [] //healthyStates.map(state => ({ state }))
  if (drugParams.length === 0) { // if no drug was given
    patients = healthyStateParams.map(state => {
      const healthyState = healthyStates.find(({ id }) => id === state)

      if (!healthyState.isCurable) {//and the state is not curable
        return { state: "X" }//if the state is not curable the patient dies
      }
      return { state }//keep the patient state
    })
  } else if (drugParams.length > 0) {
    let missDrugIdToMakeSideEffect

    for (let i = 0; i < drugParams.length; i++) {//run all params drugs
      const drugParamID = drugParams[i]; //get id from param drug
      // eslint-disable-next-line no-loop-func
      patients = healthyStateParams.map(state => { //run states params
        const healthyState = healthyStates.find(({ id }) => id === state)//get the state details to check if it is curable
        const drug = drugs.find(({ id }) => id === drugParamID) //get drug detail to check which state it treats
        const { treat } = drug

        const { missDrugIdFound, newState } = processSideEffect(state, drugParamID, missDrugIdToMakeSideEffect)
        missDrugIdToMakeSideEffect = missDrugIdFound
        if (!!newState && newState !== state) {
          return { state: newState }
        }

        if (healthyState.isCurable && treat === state) {//if the state is curable and the drug treats the state
          return { state: "H" }  //become healthy
        }
        return { state }
      })
    }
  }

  const { newPatients, flyingSpaghettiMonsterWasHere } = flyingSpaghettiMonsterNoodlyPower(patients)

  const newResult = formatedResult(newPatients)

  return {
    newPatients,
    newResult,
    flyingSpaghettiMonsterWasHere
  }
}

function flyingSpaghettiMonsterNoodlyPower(patients) {
  const noodlyPowerNumber = 8 //8 is the number of fortune in China ;)
  const flyingSpaghettiMonsterNumber = Math.floor((Math.random() * 1000000) + 1)
  let flyingSpaghettiMonsterWasHere = false
  let newPatients = patients

  if (flyingSpaghettiMonsterNumber === noodlyPowerNumber) {
    newPatients = patients.map(patient => {
      if (patient.state === 'X' && !flyingSpaghettiMonsterWasHere) { //ressurects a dead patient = only one will ressurect
        flyingSpaghettiMonsterWasHere = true
        return { state: 'H' }
      }
      return patient
    })
  }
  return { newPatients, flyingSpaghettiMonsterWasHere }
}

export function processSideEffect(state, drugParamID, missDrugId) {
  let missDrugIdFound
  let newStateFound = state

  const foundSideEffect = sideEffects.find(({ mixedDrugs }) => {
    return mixedDrugs.find(id => id === drugParamID)
  })
  if (foundSideEffect) {
    const { mixedDrugs, stateFrom, newState } = foundSideEffect
    if (!missDrugId) {
      missDrugIdFound = mixedDrugs.find(id => id !== drugParamID)
    } else {
      missDrugIdFound = missDrugId
      if (state === stateFrom || !stateFrom) {
        newStateFound = newState
      }
    }
  }

  return { missDrugIdFound, newState: newStateFound }
}

export function findWrongParamId(params, type) {
  for (let i = 0; i < params.length; i++) {
    const id = params[i]
    if (!isType(id, type)) {
      return id
    }
  }
}

export function isType(typeId, type) {
  return !!type.find(({ id }) => typeId === id)
}

export function formatedResult(patients) {
  let resultText = ""
  //build the result text as requested ex.: F:2,H:0,D:1,T:0,X:0,
  healthyStates.forEach(({ id }) => {
    const quantityOfPatients = patients.filter(({ state }) => state === id).length
    resultText += `${id}:${quantityOfPatients},`
  })
  //remove last comma
  resultText = resultText.slice(0, -1)
  return resultText
}

export function checkParams(params) {
  if (params[0].length === 0) {
    //if the command is empty return an error
    return "No command to be executed"
  }
  for (let i = 0; i < params.length; i++) {
    const param = params[i].split(',')
    for (let index = 0; index < param.length; index++) {
      if (param[index].length === 0) {
        //if the command is empty return an error
        return `Missing param text: "${param}?"`
      }
    }

  }

  if (params.length > 2) {
    //if there are too many params to be excecuted return an error
    return `Invalid parameters: ${params[2]}`
  }
}
