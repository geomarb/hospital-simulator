import React from 'react'

export default function Help() {
  return (
    <div className="help">
      <h2>Hospital Simulator - Help</h2>
      <h3>Params</h3>
      <h4>Patient Healthy State</h4>
      <p>The first parameters are the Patient Healthy State. You can type one or more parameter separated by coma. The possible parameters are: </p>
      <ul>
        <li><strong>F:</strong>  Fever</li>
        <li><strong>H:</strong>  Healthy</li>
        <li><strong>D:</strong>  Diabetes</li>
        <li><strong>T:</strong>  Tuberculosis</li>
        <li><strong>X:</strong>  Dead</li>
      </ul>
      <h4>Drugs</h4>
      <p>In the “Hospital simulator” drugs are provided to all patients. It is not possible to target a specific patient. This is the list of available drugs:</p>
      <ul>
        <li><strong>As:</strong> Aspirin </li>
        <li><strong>An:</strong> Antibiotic </li>
        <li><strong>I:</strong> Insulin </li>
        <li><strong>P:</strong> Paracetamol </li>
      </ul>
      <h4>Rules</h4>
      <ul>
        <li>In the “Hospital simulator” drugs are provided to all patients. It is not possible to target a specific patient. This is the list of available drugs:</li>
        <li>Drugs can change patients’ states. They can cure, cause side effects or even kill a patient if not properly prescribed.</li>
        <li>Drugs effects are described by the following rules:</li>
        <li>Aspirin cures Fever;</li>
        <li>Antibiotic cures Tuberculosis;</li>
        <li>Insulin prevents diabetic subject from dying, does not cure Diabetes;</li>
        <li>If insulin is mixed with antibiotic, healthy people catch Fever;</li>
        <li>Paracetamol cures Fever;</li>
        <li>Paracetamol kills subject if mixed with aspirin;</li>
        <li>One time in a million the Flying Flying Spaghetti Monster shows his noodly power and resurrects a dead patient (Dead becomes Healthy).</li>
      </ul>
    </div>
  )
}