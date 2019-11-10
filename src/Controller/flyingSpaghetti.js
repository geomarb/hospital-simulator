
const flyingSpaghettiMonsterNoodlyPower = (patients) => {
  // once in million a dead patient will be saved by the Flying Spaghetti Monster noodly power
  // sets a lucky number, generates a ramdon number and if they match ressurect a lucky patient

  const noodlyPowerLuckyNumber = 8;
  let flyingSpaghettiMonsterWasHere = false;
  let newPatients = patients;
  const flyingSpaghettiMonsterRandomNumber = Math.floor((Math.random() * 1000000) + 1);

  if (flyingSpaghettiMonsterRandomNumber === noodlyPowerLuckyNumber) {
    newPatients = patients.map((patient) => {
      if (patient.state === 'X' && !flyingSpaghettiMonsterWasHere) {
        flyingSpaghettiMonsterWasHere = true;

        return { state: 'H' };
      }

      return patient;
    });
  }

  return { newPatients, flyingSpaghettiMonsterWasHere };
};

export { flyingSpaghettiMonsterNoodlyPower as default };
