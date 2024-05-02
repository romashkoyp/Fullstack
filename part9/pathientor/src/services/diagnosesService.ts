import diagnosesData from '../../data/diagnoses';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

const findByCode = (code: string): DiagnosesEntry | undefined => {
  const entry = diagnoses.find(c => c.code === code)
  return entry;
};

export default {
  getDiagnoses, findByCode
};