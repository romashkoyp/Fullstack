import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
  console.log('data of all patients is fetched');
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  
  if (patient) {
    res.send(patient);
    console.log(`data of patient with ID ${req.params.id} was fetched`);
  } else {
    res.sendStatus(404);
    console.log(`no data found for patient's ID ${req.params.id}`);

  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
    console.log(`new patient has been added:
      ${JSON.stringify(addedEntry)}`);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // const addedPatient = patientService.addPatient({
  //   name,
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation
  // });
  // res.json(addedPatient);
  // console.log(`new patient has been added:
  //   ${JSON.stringify(addedPatient)}`);
});

export default router;