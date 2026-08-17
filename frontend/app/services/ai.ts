import api from "./api";

export const generateUI = async (prompt: string) => {
  return api.post("/generate", {
    prompt,
  });
};