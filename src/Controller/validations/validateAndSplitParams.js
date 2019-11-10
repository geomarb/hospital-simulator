import findWrongHealthyStateParam from './validateHealthyStateParam';
import findWrongDrugParam from './validateDrugParam';

const validateAndSplitParams = (params) => {
  // check and split params

  if (params.length === 0) {
    return { error: 'No command to be executed' };
  }

  if (params.length > 2) {
    return { error: `Invalid parameters: "${params[2]}"` };
  }

  const [healthyStateParams, drugParams] = params;

  const lastCharacterOfHealthyStateParams = healthyStateParams.slice(healthyStateParams.length - 1);
  if (lastCharacterOfHealthyStateParams === ',') {
    return {
      error: `Missing Healthy State command: "${healthyStateParams}?"`,
    };
  }

  const lastCharacterOfDrugParams = drugParams
    ? drugParams.slice(drugParams.length - 1)
    : '';

  if (lastCharacterOfDrugParams === ',') {
    return { error: `Missing Drug command: "${drugParams}?"` };
  }

  // if exists param split it, if not return an empty array
  const healthyStateListId = healthyStateParams ? healthyStateParams.split(',') : [];
  const drugIdList = drugParams ? drugParams.split(',') : [];

  const wrongHealthyStateParamFound = findWrongHealthyStateParam(healthyStateListId);
  if (wrongHealthyStateParamFound) {
    return { error: `Invalid Healthy State: "${wrongHealthyStateParamFound}"` };
  }

  const wrongDrugParamFound = findWrongDrugParam(drugIdList);
  if (wrongDrugParamFound) {
    return { error: `Invalid Drug: "${wrongDrugParamFound}"` };
  }

  return {
    healthyStateListId,
    drugIdList,
  };
};

export { validateAndSplitParams as default };
