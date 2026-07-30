const BASE_URL = "http://localhost:4000";

export async function generateAura(prompt: string) {
  const response = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate UI");
  }

  return response.json();
}