export default function useCognitiveLoad(
  mouseX: number,
  mouseY: number,
  clicks: number
) {
  const score = Math.min(
    100,
    Math.round((mouseX + mouseY) / 40 + clicks * 5)
  );

  return score;
}