/* eslint-disable no-undef */
import { drugs } from '../data/drug.json';

const Drug = {
  getDrugById(drugId) {
    return drugs.find((drug) => drug.id === drugId);
  },


  loadFromListOfIDs(drugListId) {
    return drugListId.map(this.getDrugById);
  },

  loadAll() {
    return drugs;
  },

  isDrug(drugParamId) {
    return drugs.some((drug) => drug.id === drugParamId);
  },

};

export { Drug as default };
