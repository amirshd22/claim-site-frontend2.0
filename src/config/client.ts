import axios from "axios";

export const SERVER_URL: string = "https://api.vadercash.com/api/";

export const client = axios.create({
  baseURL: SERVER_URL,
});
