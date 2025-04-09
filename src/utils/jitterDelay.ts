/**
 * Calculates a random delay time based on a base delay and a maximum jitter percentage.
 * This function adds a random jitter to the base delay to create variability in timing.
 * const delay = jitterDelay(1000, 0.2);
 * console.log(delay); // Could log a value between 1000 and 1200 milliseconds
 */
export default function jitterDelay(
  baseDelay: number,
  maxJitterPercentage: number
): number {
  const jitter = baseDelay * maxJitterPercentage;
  const randomDelay = baseDelay + Math.random() * jitter;
  return Math.floor(randomDelay);
}
