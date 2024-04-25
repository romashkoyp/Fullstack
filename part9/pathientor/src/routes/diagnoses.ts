import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses()); //error was here
  console.log('data of diagnoses is fetched');
});

export default router;