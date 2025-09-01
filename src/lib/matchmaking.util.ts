// lib/matchmaking.ts

export type Profile = Record<string, string>;

// Convert to number safely
type Numeric = number | null;
function parseNumber(value: string | number): Numeric {
  if (value === undefined || value === null) return null;
  const text = String(value);

  // Extract the first number (supports formats like "1,20,000", "30000", "120000.50")
  const match = text.match(/(?:\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?/);
  if (!match) return null;

  const normalized = match[0].replace(/,/g, "");
  const n = parseFloat(normalized);
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
  if (!boy && !girl) return 0;
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

export function checkMatch(
  field: string,
  maleValue: number | string,
  femaleValue: number | string
): "yes-match" | "no-match" {
  if (!maleValue || !femaleValue) return "no-match"; // Missing data is a fail

  switch (field) {
    case "height":
    case "salary_pm":
    case "age": {
      const maleNum = parseNumber(maleValue);
      const femaleNum = parseNumber(femaleValue);
      if (maleNum === null || femaleNum === null) return "no-match";
      return maleNum >= femaleNum ? "yes-match" : "no-match";
    }

    case "father_bari":
    case "mother_bari": // Example: must be different
      return maleValue !== femaleValue ? "yes-match" : "no-match";

    default:
      return maleValue === femaleValue ? "yes-match" : "no-match";
  }
}
