import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

export const getAll = async () => {
  const response = await axios
    .get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}/diaries`);
  
  return response.data;
};

export const createDiary = async (object: NewDiaryEntry) => {
  const response = await axios
    .post<NewDiaryEntry>(`${apiBaseUrl}/diaries`, object);
    
  return response.data;
};

export default {
  getAll, createDiary
};

