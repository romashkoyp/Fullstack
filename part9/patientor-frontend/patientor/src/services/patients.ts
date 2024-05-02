import axios from "axios";
import { PatientEntry, NonSensitivePatientEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientEntry[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<PatientEntry>(`${apiBaseUrl}/patients/${id}`);

  if (data) {
    return data;
  } else {
    return null;
  }
};

const create = async (object: NonSensitivePatientEntry) => {
  const { data } = await axios.post<PatientEntry>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create, getById
};

