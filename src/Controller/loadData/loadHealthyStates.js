import { healthyStates } from '../../data/healthyState.json';

const getHealthyState = (healthyStateId) => healthyStates.find(
  (healthyState) => healthyState.id === healthyStateId,
);

const loadHealthyStates = (healthyStateListId) => {
  const healthyStateList = healthyStateListId.map(
    (healthyStateId) => getHealthyState(healthyStateId),
  );
  return healthyStateList;
};

export { loadHealthyStates as default };
