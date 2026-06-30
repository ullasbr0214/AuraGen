export async function generateAuraCode(prompt: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    response: `✨ Aura generated code for: "${prompt}"`,

    code: `// AI Generated Code

// Prompt:
${prompt}

export default function Example() {
  return (
    <div className="p-8">
      <h1>Hello from AuraGen 🚀</h1>
      <p>This code was generated for:</p>
      <strong>${prompt}</strong>
    </div>
  );
}`,
  };
}