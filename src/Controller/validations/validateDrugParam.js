import { drugs } from '../../data/drug.json';

const isDrug = (param) => drugs.some((drug) => drug.id === param);

const findWrongDrugParam = (drugParamsSplitted) => {
  const wrongDrugParamFound = drugParamsSplitted.find(
    (drugParam) => !isDrug(drugParam),
  );
  return wrongDrugParamFound;
};

export {
  findWrongDrugParam as default,
  isDrug,
};
