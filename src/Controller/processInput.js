import validateAndSplitParams from './validations/validateAndSplitParams';
import loadHealthyStates from './loadData/loadHealthyStates';
import loadDrugs from './loadData/loadDrugs';
import flyingSpaghettiMonsterNoodlyPower from './flyingSpaghetti';
import formatOutput from './formatOutput';
import generatePatients from './generatePatients';

const removeExtraSpacesAndSplitInput = (input) => {
  const inputWithoutExtraSpates = input.trim();
  if (inputWithoutExtraSpates === '') {
    return [];
  }
  const inputSplitted = inputWithoutExtraSpates.split(' ');
  return inputSplitted;
};

const processInput = (input) => {
  const params = removeExtraSpacesAndSplitInput(input);
  const {
    healthyStateListId,
    drugIdList,
    error,
  } = validateAndSplitParams(params);

  if (error) {
    return {
      error,
    };
  }

  const healthyStates = loadHealthyStates(healthyStateListId);
  const drugs = loadDrugs(drugIdList);
  const patients = generatePatients(healthyStates, drugs);
  const {
    newPatients,
    flyingSpaghettiMonsterWasHere,
  } = flyingSpaghettiMonsterNoodlyPower(patients);

  const output = formatOutput(newPatients);
  return {
    patients: newPatients,
    output,
    givenDrugs: drugIdList || [],
    flyingSpaghettiMonsterWasHere,
  };
};

export {
  processInput as default,
  removeExtraSpacesAndSplitInput,
};
