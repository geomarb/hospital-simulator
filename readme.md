# The Hospital Simulator is a Coding Challenge

The "Hospital Simulator" was developed in React to attend a coding challenge proposed by Syone company.

## What it does
Simulate the future patients’ state, based on their current state and a list of drugs they take.
In the “Hospital simulator” drugs are provided to all patients. It is not possible to target a specific patient.
Drugs can change patients’ states. They can cure, cause side effects or even kill a patient if not properly prescribed.

# Health Statuses
Patients can have one of these states:
* F: Fever
* H: Healthy
* D: Diabetes
* T: Tuberculosis
* X: Dead

# Drugs
This is the list of available drugs:
* As: Aspirin
* An: Antibiotic
* I: Insulin
* P: Paracetamol

# Rules
Drugs effects are described by the following rules:
* Aspirin cures Fever;
* Antibiotic cures Tuberculosis;
* Insulin prevents diabetic subject from dying, does not cure Diabetes;
* If insulin is mixed with antibiotic, healthy people catch Fever;
* Paracetamol cures Fever;
* Paracetamol kills subject if mixed with aspirin;
* One time in a million the Flying Flying Spaghetti Monster shows his noodly power
and resurrects a dead patient (Dead becomes Healthy).

# Input

## Parameter 1
List of patients' health status codes, separated by a comma. e.g. ```“D,F,F”``` means we have 3 patients, one with diabetes and two with fever.

## Parameter 2
List of drugs codes, separated by a comma, e.g. ```“As,I”``` means patients will be treated with Aspirin and Insulin.

# Output
The result should be sent to stdout.
It should be a comma separated string with number of patients with a given state, following the format:
```F:NP,H:NP,D:NP,T:NP,X:NP```
Where:
* ``` F, H, D, T, X ```are patients’ health status codes;
* NP is a number of patients for a given state;
E.g. ```“F:0,H:2,D:0,T:0,X:1” ```means there are two healthy patients and one that is dead.

# Examples

## 1. Input: ```“D,D” “”```
Output: ```“F:0,H:0,D:0,T:0,X:2”``` (diabetic patients die without insulin)

## 2. Input: ```“F” “P”```
Output: ```“F:0,H:1,D:0,T:0,X:0”```(paracetamol cures fever)
