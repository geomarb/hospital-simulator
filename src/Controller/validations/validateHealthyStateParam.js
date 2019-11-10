import { healthyStates } from '../../data/healthyState.json';


const isHealthyState = (param) => healthyStates.some(
  (healthyState) => healthyState.id === param,
);

const findWrongHealthyStateParam = (healthyStateParamsSplitted) => {
  const wrongHealthyStateParamFound = healthyStateParamsSplitted.find(
    (healthyStateParam) => !isHealthyState(healthyStateParam),
  );
  return wrongHealthyStateParamFound;
};

export {
  findWrongHealthyStateParam as default,
  isHealthyState,
};
