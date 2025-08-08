// lib/matchmaking.ts

export type Profile = Record<string, string>;

// Convert to number safely
type Numeric = number | null;
function parseNumber(value: string): Numeric {
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

/**
 * Toggles match lines in the UI (you can use this hook in your component)
 */
export function toggleMatchLines(currentState: boolean): boolean {
  return !currentState;
}

/**
 * Calculate rating between two profiles (boy and girl)
 * based on 6 matching rules
 */
export function calculateCompatibilityRating(
  boy: Profile,
  girl: Profile
): number {
  // Initialize score
  let score = 0;

  // Total Rules
  const totalRules = 6;

  // Compare Ages
  const boyAge = parseNumber(boy.age);
  const girlAge = parseNumber(girl.age);

  // Increment the score if boy's age is greater than girl's age
  if (boyAge !== null && girlAge !== null && boyAge > girlAge) score++;

  // Compare Salaries
  const boySalary = parseNumber(boy.salary_pm);
  const girlSalary = parseNumber(girl.salary_pm);
  // Increment the score if boy's salary is greater than girl's salary
  if (boySalary !== null && girlSalary !== null && boySalary > girlSalary)
    score++;

  // Check if both mother bari's are not the same, if its not then increment the score
  if (
    boy.mother_bari?.trim().toLowerCase() !==
    girl.mother_bari?.trim().toLowerCase()
  )
    score++;

  // Increment the score if both location are the same
  if (
    boy.working_location?.trim().toLowerCase() ===
    girl.working_location?.trim().toLowerCase()
  )
    score++;

  // Check if both are divorced, and increment if they are
  const boyDiv = boy.is_divorced?.trim().toLowerCase() === "yes";
  const girlDiv = girl.is_divorced?.trim().toLowerCase() === "yes";
  if ((boyDiv && girlDiv) || (!boyDiv && !girlDiv)) score++;

  // Compare both heights and increment the score if boy's height is greater than the girl's
  const boyHeight = parseHeight(boy.height);
  const girlHeight = parseHeight(girl.height);
  if (boyHeight !== null && girlHeight !== null && boyHeight > girlHeight)
    score++;

  // Convert it to percentage and then return the compatibility percentage
  return Math.round((score / totalRules) * 100);
}

/**
 * Parse height in centimeters (e.g. "175") for comparison
 */
function parseHeight(height: string): Numeric {
  const cm = parseFloat(height);
  return isNaN(cm) ? null : cm;
}
