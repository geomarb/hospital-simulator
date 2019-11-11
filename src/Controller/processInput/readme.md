# Process Health Statuses and Drugs Function

## Function Tree

```
+processInput(input)
|
|--+validateAndSplitParams(params)
|  |
|  +--lastCharacterOf(healthStatusParams) 
|  |
|  +--lastCharacterOf(drugParams)
|  
|--+--+findWrongHealthStatusParam(healthStatusIdList)
|  |  |
|  |  +--HealthStatus.isHealthStatus(healthStatusId)
|  |
|  +--+findWrongDrugParam(drugIdList)
|     |
|     +--Drug.isDrug(drugParamId)
|
+--HealthStatus.loadFromListOfIDs(healthStatusIdList)
|  
+--Drug.loadFromListOfIDs(drugIdList)
|
+--+generatePatients(healthStatuses, drugs)
|  |
|  +--getHealthStatusId(healthStatus)
|  |
|  +--+processDrugsAndGetHealthStatusId(healthStatus, drugs)
|     |
|     +--getSideEffectFromDrugs(drugs)
|     |
|     +--getHealthStatusId(healthStatus, sideEffect, drugTreatsHealthySate)
|   
+--getIndexOfADeadPatient(patients)
|
+--formatOutput(patients)
```
