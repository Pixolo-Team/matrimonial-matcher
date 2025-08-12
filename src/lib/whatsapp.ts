// whatsappFormat.ts
type Profile = {
  timestamp?: string;
  gender?: string;
  code_no?: string;
  name?: string;
  date_of_birth?: string; // already formatted like "15 March 2001"
  age?: string | number; // computed in sheet
  birth_time?: string; // already "6:45 AM"
  birth_day?: string; // from form
  birth_place?: string;
  nakshatra?: string;
  rashi?: string;
  height?: string; // "172" or "172 cm"
  father_bari?: string;
  mother_bari?: string;
  edu_qualifications?: string;
  working_or_own_venture?: string; // Working / Own Venture
  designation?: string;
  employer?: string;
  working_location?: string;
  salary_pm?: string; // "50k"
  father_name?: string;
  father_emp_details?: string;
  mother_name?: string;
  mother_emp_details?: string;
  address?: string;
  mob1?: string;
  mob2?: string;
  email?: string;
  is_divorced?: string; // Yes/No
  is_first_marriage?: string; // Yes/No (if you kept it)
  any_other_details?: string;
  is_active?: string; // Yes/No
  photo_1?: string;
  photo_2?: string;
  photo_3?: string;
};

// 1) Labels for human-readable output
const LABELS: Record<keyof Profile, string> = {
  timestamp: "Submitted",
  gender: "Gender",
  code_no: "Code No",
  name: "Name",
  date_of_birth: "Date of Birth",
  age: "Age",
  birth_time: "Birth Time",
  birth_day: "Birth Day",
  birth_place: "Birth Place",
  nakshatra: "Nakshatra",
  rashi: "Rashi",
  height: "Height",
  father_bari: "Father Bari",
  mother_bari: "Mother Bari",
  edu_qualifications: "Education",
  working_or_own_venture: "Work Type",
  designation: "Designation",
  employer: "Employer",
  working_location: "Working Location",
  salary_pm: "Salary (PM)",
  father_name: "Father Name",
  father_emp_details: "Father Employment",
  mother_name: "Mother Name",
  mother_emp_details: "Mother Employment",
  address: "Address",
  mob1: "Mobile 1",
  mob2: "Mobile 2",
  email: "Email",
  is_divorced: "Divorced",
  is_first_marriage: "First Marriage",
  any_other_details: "Other Details",
  is_active: "Active",
  photo_1: "Photo 1",
  photo_2: "Photo 2",
  photo_3: "Photo 3",
};

// 2) Default order for a full message (tweak as you like)
const FULL_FIELDS: (keyof Profile)[] = [
  "code_no",
  "name",
  "gender",
  "date_of_birth",
  "age",
  "birth_time",
  "birth_day",
  "birth_place",
  "height",
  "nakshatra",
  "rashi",
  "father_bari",
  "mother_bari",
  "edu_qualifications",
  "working_or_own_venture",
  "designation",
  "employer",
  "working_location",
  "salary_pm",
  "father_name",
  "father_emp_details",
  "mother_name",
  "mother_emp_details",
  "address",
  "mob1",
  "mob2",
  "email",
  "is_divorced",
  "is_first_marriage",
  "any_other_details",
  // Put photos at end so WhatsApp preview shows links neatly
  "photo_1",
  "photo_2",
  "photo_3",
];

// 3) Small sanitizer for WhatsApp special characters
function esc(s: string) {
  return s
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/~/g, "\\~")
    .replace(/`/g, "\\`");
}

// 4) Render a line like: • Label: Value
function line(label: string, value?: string | number) {
  if (value === undefined || value === null) return "";
  const v = String(value).trim();
  if (!v) return "";
  return `• *${label}:* ${esc(v)}`;
}

// 5) Build a message from an ordered list of keys
function buildMessage(
  profile: Profile,
  fields: (keyof Profile)[],
  title?: string
) {
  const headerName = profile.name ? `*${esc(profile.name)}*` : "*Profile*";
  const headerCode = profile.code_no ? ` (${esc(profile.code_no)})` : "";
  const header = title ?? `${headerName}${headerCode}`;

  const body = fields
    .map((k) => line(LABELS[k], profile[k]))
    .filter(Boolean)
    .join("\n");

  // Nice WhatsApp spacing + end note
  return `${header}\n\n${body}`.trim();
}

// 6) Public: Full message (all fields in FULL_FIELDS)
export function buildFullWhatsAppMessage(profile: Profile) {
  return buildMessage(profile, FULL_FIELDS);
}

// 7) Public: Partial message with flexible include/exclude
type PartialOptions = {
  include?: (keyof Profile)[]; // only these keys (in this order)
  exclude?: (keyof Profile)[]; // remove these keys
  order?: (keyof Profile)[]; // custom order (overrides default/ include)
  title?: string; // custom header line
};

export function buildPartialWhatsAppMessage(
  profile: Profile,
  opts: PartialOptions = {}
) {
  let fields: (keyof Profile)[];

  if (opts.include?.length) {
    fields = [...opts.include];
  } else if (opts.order?.length) {
    fields = [...opts.order];
  } else {
    // sensible default for a short card
    fields = [
      "code_no",
      "name",
      "gender",
      "date_of_birth",
      "age",
      "height",
      "working_or_own_venture",
      "designation",
      "employer",
      "working_location",
      "mob1",
    ];
  }

  if (opts.exclude?.length) {
    const excl = new Set(opts.exclude);
    fields = fields.filter((f) => !excl.has(f));
  }

  if (opts.order?.length) {
    // ensure order takes precedence while respecting include/exclude
    const keep = new Set(fields);
    fields = opts.order.filter((k) => keep.has(k));
  }

  return buildMessage(profile, fields, opts.title);
}

/**
 * Normalize a phone number for WhatsApp:
 * - keep digits only
 * - add default country code if missing (e.g., "91" for India)
 */
export function normalizePhone(
  raw?: string,
  defaultCountryCode = "91"
): string | null {
  if (!raw) return null;

  const digits = raw.toString().replace(/\D/g, ""); // strip non-digits
  if (!digits) return null;

  // Already has country code? (very rough check: 10-digit local assumed Indian)
  if (digits.length > 10) return digits;

  // If exactly 10 digits (India), prepend default country code
  if (digits.length === 10) return defaultCountryCode + digits;

  // Otherwise return as-is (you can add more rules if needed)
  return digits;
}

/**
 * Optional: explicitly force Web WhatsApp on desktop.
 * (wa.me usually redirects correctly, but you can use this if you prefer.)
 */
export function buildWebWhatsAppLink(message: string, phone: string) {
  const encoded = encodeURIComponent(message);
  const normalized = normalizePhone(phone || "");

  if (normalized) {
    return `https://web.whatsapp.com/send?phone=${normalized}&text=${encoded}`;
  }
  return `https://web.whatsapp.com/send?text=${encoded}`;
}
