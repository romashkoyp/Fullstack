import diagnosesData from '../../data/diagnoses.json';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};