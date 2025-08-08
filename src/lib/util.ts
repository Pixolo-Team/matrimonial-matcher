/**
 * Converts a string to snake_case
 * e.g. "DATE OF BIRTH" → "date_of_birth"
 */
export function convertToSnakeCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_") // spaces to underscores
    .replace(/[^\w]/g, ""); // remove any other non-word chars
}

/**
 * Parses Google Sheets gviz-style date string ("Date(YYYY,MM,DD,HH,MM,SS)")
 * into a JS Date object.
 */
export function parseGvizDate(dateStr: string): Date | null {
  const match = dateStr?.match(
    /Date\((\d+),(\d+),(\d+),?(\d+)?,?(\d+)?,?(\d+)?\)/
  );
  if (!match) return null;

  const [, year, month, day, hours = "0", minutes = "0", seconds = "0"] = match;
  return new Date(
    Number(year),
    Number(month), // month is already zero-based in gviz
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds)
  );
}

/**
 * Formats a Date object into "15 March 2001"
 */
export function formatDateLong(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats a Date object into "6:45 AM"
 */
export function formatTime12h(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// utils/drive.ts
export function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);

    // 1) https://drive.google.com/open?id=FILE_ID
    const idFromQuery = u.searchParams.get("id");
    if (idFromQuery) return idFromQuery;

    // 2) https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const m = u.pathname.match(/\/file\/d\/([^/]+)/);
    if (m?.[1]) return m[1];

    // 3) https://drive.google.com/uc?export=view&id=FILE_ID (already direct)
    const idFromUc = u.searchParams.get("id");
    if (u.pathname.startsWith("/uc") && idFromUc) return idFromUc;

    // 4) https://drive.google.com/thumbnail?id=FILE_ID
    const idFromThumb = u.searchParams.get("id");
    if (u.pathname.startsWith("/thumbnail") && idFromThumb) return idFromThumb;

    return null;
  } catch {
    return null;
  }
}

export function toDriveDirectView(url: string): string {
  const id = extractDriveFileId(url);
  console.log(id, "id");
  return id ? `https://drive.google.com/uc?export=view&id=${id}` : url;
}
