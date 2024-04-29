import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry, ValidationError } from "../types";
import { apiBaseUrl } from "../constants";

export const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return response.data;
};

export const createDiary = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<NewDiaryEntry>(`${apiBaseUrl}/diaries`, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.error(error.response);
  } else {
    console.error(error);
  }
    throw error;
  }
};

export default {
  getAll,
  createDiary
};