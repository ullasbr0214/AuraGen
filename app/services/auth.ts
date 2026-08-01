import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await API.post("/auth/login", data);
  return response.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await API.post("/auth/register", data);
  return response.data;
}

export async function forgotPassword(email: string) {
  const response = await API.post("/auth/forgot-password", {
    email,
  });

  return response.data;
}

export default API;