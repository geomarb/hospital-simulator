
/* eslint-disable no-param-reassign */

function getSideEffect(drugs, sideEffectDrugIdList = '', index = 0) {
  if (drugs.length === 0) {
    return null;
  }

  const drug = drugs[index];
  const isDrugIdAMatch = sideEffectDrugIdList.indexOf(drug.id) > -1;
  if (isDrugIdAMatch) {
    return drug.sideEffect;
  }

  sideEffectDrugIdList += ` ${drug.sideEffect.mixedWithDrugId}`;
  index += 1;

  if (index === drugs.length) {
    return null;
  }

  return getSideEffect(drugs, sideEffectDrugIdList, index);
}


export {
  getSideEffect as default,
  //  hasSideEffect,
};
// const hasSideEffect = (sideEffectDrugId, drugs) => drugs.some(
//   (drug) => drug.id === sideEffectDrugId,
// );
// const getSideEffectxxxx = (drugs) => {
//   let sideEffectFound;

//   drugs.forEach((drug) => {
//     const sideEffectDrugId = drug.sideEffect.mixedWithDrugId;

//     if (hasSideEffect(sideEffectDrugId, drugs) && !sideEffectFound) {
//       sideEffectFound = drug.sideEffect;
//     }
//   });

//   return sideEffectFound;
// };
