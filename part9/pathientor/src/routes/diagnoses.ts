import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses()); //error was here
  console.log('data of diagnoses is fetched');
});

router.get('/:code', (req, res) => {
  const diagnosis = diagnosesService.findByCode(String(req.params.code));
  
  if (diagnosis) {
    res.send(diagnosis);
    console.log(`data of diagnosis with code ${req.params.code} was fetched`);
  } else {
    res.sendStatus(404);
    console.log(`no data found for diagnosis's code ${req.params.code}`);

  }
});

export default router;