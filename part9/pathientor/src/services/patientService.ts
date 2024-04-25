import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
const id = uuid();

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

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id)
  return entry;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getPatient,
  getNonSensitiveEntries,
  findById,
  addPatient,
};