import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

export const getAll = async () => {
  const response = await axios
    .get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}/diaries`);
  
  return response.data;
};

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/patients`,
//     object
//   );
// 
//   return data;
// };

export default {
  getAll
};

