import axios from "axios";

export interface ResponseApi<T> {
  ok: boolean;
  message: string;
  data?: T;
}

const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL,
});
