import patientData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getPatient = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatient,
  getNonSensitiveEntries
};