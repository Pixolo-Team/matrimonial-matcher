// lib/constants.ts

export const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/18lBcZjT2jzWLEQWeVuDN7ZncO92IQo4OmgBMQaz4sws/gviz/tq?tqx=out:json";

export const columnMap: Record<string, string> = {
  A: "timestamp",
  B: "gender", // or "bride_or_groom" if renamed in form
  C: "code_no",
  D: "name",
  E: "date_of_birth",
  F: "birth_time",
  G: "birth_day",
  H: "birth_place",
  I: "nakshatra",
  J: "rashi",
  K: "height",
  L: "edu_qualifications",
  M: "working_or_own_venture",
  N: "designation",
  O: "employer",
  P: "working_location",
  Q: "salary_pm",
  R: "father_name",
  S: "father_bari",
  T: "father_emp_details",
  U: "mother_name",
  V: "mother_bari",
  W: "mother_emp_details",
  X: "address",
  Y: "mob1",
  Z: "mob2",
  AA: "email",
  AB: "is_divorced",
  AC: "is_first_marriage",
  AD: "any_other_details",
  AE: "photo_1",
  AF: "photo_2",
  AG: "photo_3",
  AH: "willing_to_relocate",
  AI: "billawar_member",
  AJ: "member_phone_number",
};
