
import getSideEffect from './getSideEffect';

const getHealthyStateIdAfterSideEffect = (healthyStateId, sideEffect) => {
  if (sideEffect.currentHealthyStateId === healthyStateId) {
    return sideEffect.newHealthyStateId;
  }

  if (!sideEffect.currentHealthyStateId) {
    return sideEffect.newHealthyStateId;
  }

  return healthyStateId;
};

const getHealthyStateId = (healthyState, sideEffect, drugTreatsHealthySate) => {
  if (!healthyState.isCurable && !drugTreatsHealthySate) {
    return 'X';
  }

  if (sideEffect) {
    return getHealthyStateIdAfterSideEffect(healthyState.id, sideEffect);
  }

  if (drugTreatsHealthySate && healthyState.isCurable) {
    return 'H';
  }

  return healthyState.id;
};

const processDrugsAndGetHealthyStateId = (healthyState, drugs) => {
  const sideEffect = getSideEffect(drugs);
  let healthyStateId = healthyState.id;
  let drugTreatsHealthySate;

  drugs.forEach((drug) => {
    if (!drugTreatsHealthySate) {
      drugTreatsHealthySate = drug ? drug.treatHealthStateId === healthyState.id : false;
    }
    healthyStateId = getHealthyStateId(healthyState, sideEffect, drugTreatsHealthySate);
  });
  return healthyStateId;
};

const generatePatients = (healthyStates, drugs) => {
  const patients = healthyStates.map((healthyState) => {
    let healthyStateId;
    if (drugs.length === 0) {
      healthyStateId = getHealthyStateId(healthyState);
    } else {
      healthyStateId = processDrugsAndGetHealthyStateId(healthyState, drugs);
    }
    return { healthyStateId };
  });
  return patients;
};

export {
  generatePatients as default,
  getHealthyStateIdAfterSideEffect,
  getHealthyStateId as getHealthyStateIdAfterDrug,
  processDrugsAndGetHealthyStateId as processDrugsToGetHealthyStateId,
};
