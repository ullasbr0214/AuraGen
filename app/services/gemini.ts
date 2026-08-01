export async function generateCode(prompt: string) {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!res.ok) {
      throw new Error("Generation failed");
    }

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      code: "",
      explanation: "Unable to generate code.",
    };
  }
}