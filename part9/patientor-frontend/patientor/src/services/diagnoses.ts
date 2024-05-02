import axios from "axios";
import { DiagnosesEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async () => {
  const { data } = await axios.get<DiagnosesEntry[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const findByCode = async (code: string) => {
  const { data } = await axios.get<DiagnosesEntry>(`${apiBaseUrl}/diagnoses/${code}`);

  if (data) {
    return data;
  } else {
    return null;
  }
};

export default {
  getAllDiagnoses, findByCode
};