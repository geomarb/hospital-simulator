import { healthStatuses } from '../data/healthStatus.json';

const HealthStatus = {
  getHealthStatusById(healthStatusId) {
    return healthStatuses.find(
      (healthStatus) => healthStatus.id === healthStatusId,
    );
  },

  loadFromListOfIDs(healthStatusIdList) {
    return healthStatusIdList.map(this.getHealthStatusById);
  },

  loadAll() {
    return healthStatuses;
  },

  isHealthStatus(healthStatusId) {
    return healthStatuses.some(
      (healthStatus) => healthStatus.id === healthStatusId,
    );
  },

};

export { HealthStatus as default };
