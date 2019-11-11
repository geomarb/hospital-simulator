
import getSideEffectFromDrugs from './getSideEffectFromDrugs';

const getHealthStatusIdAfterSideEffect = (healthStatusId, sideEffect) => {
  if (sideEffect.currentHealthStatusId === healthStatusId) {
    return sideEffect.newHealthStatusId;
  }

  if (!sideEffect.currentHealthStatusId) {
    return sideEffect.newHealthStatusId;
  }

  return healthStatusId;
};

const getHealthStatusId = (healthStatus, sideEffect, drugTreatsHealthySate) => {
  if (!healthStatus.isCurable && !drugTreatsHealthySate) {
    return 'X';
  }

  if (sideEffect) {
    return getHealthStatusIdAfterSideEffect(healthStatus.id, sideEffect);
  }

  if (drugTreatsHealthySate && healthStatus.isCurable) {
    return 'H';
  }

  return healthStatus.id;
};

const processDrugsAndGetHealthStatusId = (healthStatus, drugs) => {
  const sideEffect = getSideEffectFromDrugs(drugs);
  let healthStatusId = healthStatus.id;
  let drugTreatsHealthySate;

  drugs.forEach((drug) => {
    if (!drugTreatsHealthySate && drug) {
      drugTreatsHealthySate = drug.treatHealthStateId === healthStatus.id;
    }
    healthStatusId = getHealthStatusId(healthStatus, sideEffect, drugTreatsHealthySate);
  });
  return healthStatusId;
};

const generatePatients = (healthStatuses, drugs) => healthStatuses.map(
  (healthStatus) => ({
    healthStatusId: drugs.length === 0
      ? getHealthStatusId(healthStatus)
      : processDrugsAndGetHealthStatusId(healthStatus, drugs),
  }),
);

export {
  generatePatients as default,
  getHealthStatusIdAfterSideEffect,
  getHealthStatusId as getHealthStatusIdAfterDrug,
  processDrugsAndGetHealthStatusId as processDrugsToGetHealthStatusId,
};
