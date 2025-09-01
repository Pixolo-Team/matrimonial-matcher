// CONSTANTS //
import { columnMap, SHEET_COLUMNS_URL } from "@/constants";
import axios from "axios";

export interface SheetColumns {
  [key: string]: string;
}

/**
 * Fetches the column mapping from the external API
 * @returns Promise<SheetColumns> - The column mapping object
 */
export async function fetchSheetColumns(): Promise<SheetColumns> {
  try {
    const response = await axios.get(SHEET_COLUMNS_URL);

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch sheet columns: ${response.status} ${response.statusText}`
      );
    }

    const columns: SheetColumns = response.data;

    return columns;
  } catch (error) {
    console.error("Error fetching sheet columns:", error);

    // Fallback to default columns if API fails
    return columnMap;
  }
}
