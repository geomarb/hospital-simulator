import { healthyStates } from '../data/healthyState.json'
import { drugs } from '../data/drug.json'
import { sideEffects } from '../data/drugSideEffect.json'

export default function executeCommand(command) {
  //remove extra spaces and separate command in params by space
  const params = command.trim().split(" ")

  //get healthy state params
  const healthyStateParams = params.length > 0 ? params[0].split(',') : []

  //get drugs params
  const drugParams = params.length === 2 ? params[1].split(',') : []

  //check if the params length is ok
  const paramErrorMessage = checkParams(params)

  //this will be used to keep the final result based on the params provided
  let patients = []

  if (paramErrorMessage) {
    return { error: paramErrorMessage }
  }

  //check if there are any wrong param by type
  const wrongHealthyParamId = findWrongParamId(healthyStateParams, healthyStates)

  if (wrongHealthyParamId) {

    return { error: `Invalid Healthy State: ${wrongHealthyParamId}` }
  }

  const wrongDrugId = findWrongParamId(drugParams, drugs)

  if (wrongDrugId) {

    return { error: `Invalid Drug: ${wrongDrugId}` }
  }

  if (drugParams.length === 0) {
    // if no drug was given

    // process the healthy state param without drugs
    const { newPatients } = processHealthyStateParams(healthyStateParams)

    patients = newPatients

  } else if (drugParams.length > 0) {
    //if drug was given

    //it will be filled just once for each drug if the drug causes side effect
    let missingMatchDrugToCauseSideEffect

    //run all drugs 
    drugParams.forEach(drugParamId => {
      //get the state what the drug treats or cures
      const { treat: stateTreatedByTheDrug } = drugs.find(({ id }) => id === drugParamId)

      //create drug param
      const drug = { drugParamId, stateTreatedByTheDrug, missingMatchDrugToCauseSideEffect }

      // process the healthy state param with drugs
      const { newPatients, sideEffectDrugIdFound } = processHealthyStateParams(healthyStateParams, drug)

      // set the missing match drug for the next turn validation
      missingMatchDrugToCauseSideEffect = sideEffectDrugIdFound

      //set patients
      patients = newPatients
    })
  }

  //execute flying spaghetti monster function... well, you know what happens when he appears :-P
  const { newPatients, flyingSpaghettiMonsterWasHere } = flyingSpaghettiMonsterNoodlyPower(patients)

  //format the text to be showed as requested... ex: F:0,H:3,D:0,T:0,X:0
  const newResult = formatedResult(newPatients)

  return {
    newPatients,
    newResult,
    givenDrugs: drugParams || [],
    flyingSpaghettiMonsterWasHere
  }
}

function processHealthyStateParams(healthyStateParams, drug) {

  // setted only if drug was gives and has side effect
  let sideEffectDrugIdFound

  const newPatients = healthyStateParams.map(state => {
    //run all healthy states params and return a new patient for each state

    //get the healthy state detail to check if it is possible to cure it
    const { isCurable } = healthyStates.find(({ id }) => id === state)

    if (drug) {
      //if drug was given...

      // destructre drug
      const { drugParamId, stateTreatedByTheDrug, missingMatchDrugToCauseSideEffect } = drug

      //check if the drug has side effect combined with another drug and returns the missing drug or the new state
      const { missingSideEffectDrugIdFound, newState } = processSideEffect(state, drugParamId, missingMatchDrugToCauseSideEffect)

      //set the missing drug to cause side effect the check it in the next turn
      sideEffectDrugIdFound = missingSideEffectDrugIdFound


      if (!!newState && newState !== state) {
        //if a new state came from drug side effect returns it as a new patient with the state

        return { state: newState }
      }
      if (isCurable && stateTreatedByTheDrug === state) {
        //if no side effect was found and the state is curable and the drug treats the state the patient is cured

        //become healthy
        return { state: "H" }
      }

    }

    if (!isCurable && !drug) {
      //if healthy state is not curable and no drug was given

      //patient dies
      return { state: "X" }
    }

    //if no changes were applied to state 
    return { state }
  })

  return { newPatients, sideEffectDrugIdFound }
}

function flyingSpaghettiMonsterNoodlyPower(patients) {
  //once in million a dead patient will be saved by the Flying Spaghetti Monster noodly power

  //8 is the number of fortune in China ;)
  const noodlyPowerNumber = 8

  //he was not here yet
  let flyingSpaghettiMonsterWasHere = false

  //get patients that can be saved
  let newPatients = patients

  //get an aleatory number from a million numbers reange
  const flyingSpaghettiMonsterNumber = Math.floor((Math.random() * 1000000) + 1)


  if (flyingSpaghettiMonsterNumber === noodlyPowerNumber) {
    //he is here!!! 

    newPatients = patients.map(patient => {
      //run patients

      if (patient.state === 'X' && !flyingSpaghettiMonsterWasHere) {
        //ressurects a dead patient

        //only one will be lucky one
        flyingSpaghettiMonsterWasHere = true

        //take him back from the dust
        return { state: 'H' }
      }

      //not lucky guy...
      return patient
    })
  }


  return { newPatients, flyingSpaghettiMonsterWasHere }
}

export function processSideEffect(state, drugParamId, missDrugId) {
  //process side effect

  let missingSideEffectDrugIdFound

  let newState = state

  const foundSideEffect = sideEffects.find(({ mixedDrugs }) => {
    //find a side effect that matches with the drug

    return mixedDrugs.find(id => id === drugParamId)
  })

  if (foundSideEffect) {
    //if there is side effect 

    //get it is params
    const { mixedDrugs, stateFrom, stateTo } = foundSideEffect

    if (!missDrugId) {
      //if don't have miss drug set yet

      //find and set missing drug, it is done once for each drug, next time it will be the missDrugId
      missingSideEffectDrugIdFound = mixedDrugs.find(id => id !== drugParamId)

    } else if (missDrugId === drugParamId) {
      //if already found a drug effect and it matches with the next drug (this is the next drug in this case)

      //sets missing side effect what will return in missDrugId
      missingSideEffectDrugIdFound = missDrugId

      if (state === stateFrom || !stateFrom) {
        //if state is the same as state from in the side effect sets a new state

        newState = stateTo
      }
    }
  }

  return { missingSideEffectDrugIdFound, newState }
}

export function isType(typeId, type) {
  //check if the id exists in the type array passed and return true if or false if did not found

  return !!type.find(({ id }) => typeId === id)
}

export function formatedResult(patients) {
  //format the text to be showed as requested... ex: F:0,H:3,D:0,T:0,X:0

  let resultText = ""

  //build the result text as requested ex.: F:2,H:0,D:1,T:0,X:0,
  healthyStates.forEach(({ id }) => {
    // run all states

    //get the quantity of patients found for each state
    const quantityOfPatients = patients.filter(({ state }) => state === id).length

    //add ID and quantity to the result text
    resultText += `${id}:${quantityOfPatients},`
  })

  //remove last comma
  resultText = resultText.slice(0, -1)

  return resultText
}

export function checkParams(params) {
  //check all params received and return an error message if it is the case

  if (params[0].length === 0) {
    //if the command is empty return an error

    return "No command to be executed"
  }

  if (params.length > 2) {
    //if there are too many params to be executed return an error

    return `Invalid parameters: ${params[2]}`
  }

  for (let i = 0; i < params.length; i++) {
    //run all params

    //break the params in param item
    const param = params[i].split(',')

    for (let index = 0; index < param.length; index++) {
      //run through each param item 

      if (param[index].length === 0) {
        //if the command is empty return an error

        return `Missing param text: "${param}?"`
      }
    }

  }

}

export function findWrongParamId(params, type) {
  //check if the params are not ok

  for (let i = 0; i < params.length; i++) {
    //run all params 

    const id = params[i]

    if (!isType(id, type)) {
      //if the param id is wrong return it back

      return id
    }
  }
}
