import Drug from '../../models/Drug';
import HealthStatus from '../../models/HealthStatus';

const findWrongDrugParam = (drugParamsSplitted) => (
  drugParamsSplitted.find((drugParamId) => !Drug.isDrug(drugParamId))
);

const findWrongHealthStatusParam = (healthStatusParamsSplitted) => (
  healthStatusParamsSplitted.find((healthStatusId) => !HealthStatus.isHealthStatus(healthStatusId))
);

const lastCharacterOf = (string) => (string ? string.slice(string.length - 1) : '');

const validateAndSplitParams = (params) => {
  if (params.length === 0) {
    return { error: 'No command to be executed' };
  }

  if (params.length > 2) {
    return { error: `Invalid parameters: "${params[2]}"` };
  }

  const [healthStatusParams, drugParams] = params;// split params

  if (lastCharacterOf(healthStatusParams) === ',') {
    return { error: `Missing Health Status command: "${healthStatusParams}?"` };
  }

  if (lastCharacterOf(drugParams) === ',') {
    return { error: `Missing Drug command: "${drugParams}?"` };
  }

  const healthStatusIdList = healthStatusParams ? healthStatusParams.split(',') : [];
  const drugIdList = drugParams ? drugParams.split(',') : [];

  const wrongHealthStatusParamFound = findWrongHealthStatusParam(healthStatusIdList);
  if (wrongHealthStatusParamFound) {
    return { error: `Invalid Health Status: "${wrongHealthStatusParamFound}"` };
  }

  const wrongDrugParamFound = findWrongDrugParam(drugIdList);
  if (wrongDrugParamFound) {
    return { error: `Invalid Drug: "${wrongDrugParamFound}"` };
  }
  return {
    healthStatusIdList,
    drugIdList,
  };
};

export {
  validateAndSplitParams as default,
  findWrongHealthStatusParam,
  findWrongDrugParam,
};
