/* eslint-disable @typescript-eslint/no-explicit-any */

import { columnMap } from "@/constants";
import {
  calculateAge,
  formatDateLong,
  formatTime12h,
  parseGvizDate,
  toDriveDirectView,
} from "./util";

/**
 * Represents a row from the Google Sheet as a key-value pair,
 * where each key is a column name.
 */
type SheetRow = Record<string, string>;

/**
 * Cleans the weird Google Sheets response format from the gviz endpoint.
 * Removes extra JS wrapper and parses into valid JSON.
 */
function cleanGoogleSheetResponse(rawText: string): any {
  const cleanedResponse = rawText
    .replace("/*O_o*/", "") // Remove comment
    .replace(/.*setResponse\(/, "") // Remove JS function wrapper
    .slice(0, -2); // Remove closing `);`

  return JSON.parse(cleanedResponse); // Parse cleaned string into JSON
}

/**
 * Fetches raw data from a published Google Sheet URL and returns cleaned JSON.
 */
async function fetchRawSheetJson(sheetUrl: string): Promise<any> {
  const res = await fetch(sheetUrl);
  const rawText = await res.text();
  return cleanGoogleSheetResponse(rawText);
}

function normalizePhoto(url?: string) {
  return url ? toDriveDirectView(url) : "";
}

/**
 * Converts Google's table format to an array of clean objects.
 * Each object represents a row, with column labels as keys.
 */
function parseSheetRows(json: any): SheetRow[] {
  const colLetters = Object.keys(columnMap);

  return json.table.rows.map((row: any) =>
    row.c.reduce((acc: SheetRow, cell: any, i: number) => {
      const colLetter = colLetters[i];
      const key = columnMap[colLetter];
      const value = cell?.v ?? "-";

      // Special handling for DOB
      if (key === "date_of_birth") {
        const dateObj = parseGvizDate(value);
        const formattedDate = formatDateLong(dateObj); // "15 March 2001"
        acc[key] = formattedDate;

        // Also set computed age here
        acc.age = calculateAge(dateObj ?? "");
        return acc;
      }
      // Special handling for Birth Time
      if (key === "birth_time") {
        const timeObj = parseGvizDate(value);
        acc[key] = formatTime12h(timeObj); // "6:45 AM"
        return acc;
      }

      // Special Handling for photos
      if (key === "photo_1" || key === "photo_2" || key === "photo_3") {
        // If value is - then return empty to avoid ui break
        if (value === "-") {
          acc[key] = "";
        } else {
          acc[key] = normalizePhoto(String(value));
        }
        return acc;
      } else {
        acc[key] = value;
      }

      // Everything else
      acc[key] = value;
      return acc;
    }, {})
  );
}

/**
 * Filters out users where the "IS ACTIVE" column is not truthy.
 * Accepts: "yes", "true", "1" (case-insensitive).
 */
function filterActiveRows(rows: SheetRow[]): SheetRow[] {
  return rows.filter((row) => {
    const isActiveKey = columnMap["AH"]; // last column in your sheet
    const isActiveValue = row[isActiveKey]?.toString().toLowerCase().trim();
    return isActiveValue === "yes";
  });
}

/**
 * Public function to fetch and return only active rows from the Google Sheet.
 * Handles cleaning, parsing, and filtering steps.
 */
export async function fetchSheetData(sheetUrl: string): Promise<SheetRow[]> {
  const rawJson = await fetchRawSheetJson(sheetUrl); // Step 1: Fetch + clean
  const allRows = parseSheetRows(rawJson); // Step 2: Parse rows
  const activeRows = filterActiveRows(allRows); // Step 3: Filter
  return activeRows;
}
