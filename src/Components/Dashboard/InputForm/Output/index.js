import React from 'react';
import OutputFlyingSpaghettiMonster from './OutputFlyingSpaghettiMonster';
import OutputError from './OutputError';
import OutputText from './OutputText';
import './styles.css';

const Output = ({
  output,
  setOutput,
  isFlyingSpaghettiMonsterHere,
  setisFlyingSpaghettiMonsterHere,
}) => (
  <>
    <OutputText text={output.text} setOutput={setOutput} />
    <OutputError errorMessage={output.error} setOutput={setOutput} />
    <OutputFlyingSpaghettiMonster
      isFlyingSpaghettiMonsterHere={isFlyingSpaghettiMonsterHere}
      setisFlyingSpaghettiMonsterHere={setisFlyingSpaghettiMonsterHere}
    />
  </>
);
export { Output as default };
