import { drugs } from '../../data/drug.json';

const getDrug = (drugId) => drugs.find(
  (drug) => drug.id === drugId,
);

const loadDrugs = (drugListId) => {
  const drugList = drugListId.map(
    (drugId) => getDrug(drugId),
  );
  return drugList;
};

export { loadDrugs as default };
