import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: URL,
});
