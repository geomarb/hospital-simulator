
/* eslint-disable no-param-reassign */
const getSideEffectFromDrugs = (drugs, sideEffectDrugIdList = '', index = 0) => {
  const drug = drugs[index];
  const isDrugIdAMatch = sideEffectDrugIdList.indexOf(drug.id) > -1;

  if (isDrugIdAMatch) {
    return drug.sideEffect;
  }

  sideEffectDrugIdList += ` ${drug.sideEffect.mixedWithDrugId}`;// array was not working, so I used a string
  index += 1;

  if (index === drugs.length) {
    return null;
  }

  return getSideEffectFromDrugs(drugs, sideEffectDrugIdList, index);
};

export {
  getSideEffectFromDrugs as default,
};
