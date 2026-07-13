export type GeneratedComponent = {
  id: number;
  title: string;
  description: string;
};

export async function fetchGeneratedComponents(): Promise<GeneratedComponent[]> {
  // Simulate AI generation delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return [
    {
      id: 1,
      title: "Adaptive Dashboard",
      description:
        "AI generated a simplified dashboard layout based on cognitive load.",
    },
    {
      id: 2,
      title: "Telemetry Widget",
      description:
        "Live telemetry visualization successfully injected.",
    },
    {
      id: 3,
      title: "AI Recommendation Panel",
      description:
        "Dynamic recommendation widget generated.",
    },
  ];
}