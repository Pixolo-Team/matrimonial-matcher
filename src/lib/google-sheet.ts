/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  calculateAge,
  formatDateLong,
  formatTime12h,
  parseGvizDate,
  toDriveDirectView,
} from "./util";
import { fetchSheetColumns, SheetColumns } from "@/services/sheet-columns";

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
function parseSheetRows(json: any, columnMap: SheetColumns): SheetRow[] {
  const colLetters = Object.keys(columnMap);

  return json.table.rows.map((row: any) => {
    const parsedRow = row.c.reduce((acc: SheetRow, cell: any, i: number) => {
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
        // If value is "-" then return empty to avoid UI break
        acc[key] = value === "-" ? "" : normalizePhoto(String(value));
        return acc;
      }

      // Special handling for Salary
      if (key === "salary_pm") {
        acc[key] = formatINR(value); // Format number to Indian commas
        return acc;
      }

      // Special handling for Height - remove letters like "cm" and extract number
      if (key === "height") {
        const match = String(value).match(/^(\d+(?:\.\d+)?)/);
        acc[key] = match ? match[1] : value;
        return acc;
      }

      // Default case for all other fields
      acc[key] = value;
      return acc;
    }, {} as SheetRow);

    // Always set is_active from the sheet's last column, even if not mapped
    const lastCellValue = row.c?.[row.c.length - 1]?.v ?? "-";
    parsedRow.is_active = String(lastCellValue);

    return parsedRow;
  });
}

/**
 * Format a number into Indian-style commas
 * e.g., 100000 -> "1,00,000"
 */
function formatINR(value: string | number): string {
  if (!value) return "-";
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return num.toLocaleString("en-IN");
}

/**
 * Filters out users where the "IS ACTIVE" column is not truthy.
 * Accepts: "yes", "true", "1" (case-insensitive).
 */
function filterActiveRows(rows: SheetRow[]): SheetRow[] {
  return rows.filter((row) => {
    const isActiveValue = row["is_active"]?.toString().toLowerCase().trim();
    return (
      isActiveValue === "yes" ||
      isActiveValue === "true" ||
      isActiveValue === "1"
    );
  });
}

/**
 * Public function to fetch and return only active rows from the Google Sheet.
 * Handles cleaning, parsing, and filtering steps.
 */
export async function fetchSheetData(sheetUrl: string): Promise<SheetRow[]> {
  try {
    // Fetch column mapping first
    const columnMap = await fetchSheetColumns();

    // Fetch sheet data
    const rawJson = await fetchRawSheetJson(sheetUrl);

    // Parse rows using the fetched columnMap
    const allRows = parseSheetRows(rawJson, columnMap);

    // Filter active rows
    const activeRows = filterActiveRows(allRows);

    return activeRows;
  } catch (error) {
    console.error("Error in fetchSheetData:", error);
    throw error;
  }
}
