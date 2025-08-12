// lib/constants.ts

export const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/18lBcZjT2jzWLEQWeVuDN7ZncO92IQo4OmgBMQaz4sws/gviz/tq?tqx=out:json";

export const columnMap: Record<string, string> = {
  A: "timestamp",
  B: "gender", // previously "gender"
  C: "code_no",
  D: "name",
  E: "date_of_birth",
  F: "age",
  G: "birth_time",
  H: "birth_day",
  I: "birth_place",
  J: "nakshatra",
  K: "rashi",
  L: "height",
  M: "edu_qualifications",
  N: "working_or_own_venture",
  O: "designation",
  P: "employer",
  Q: "working_location",
  R: "salary_pm",
  S: "father_name",
  T: "father_bari",
  U: "father_emp_details",
  V: "mother_name",
  W: "mother_bari",
  X: "mother_emp_details",
  Y: "address",
  Z: "mob1",
  AA: "mob2",
  AB: "email",
  AC: "is_divorced",
  AD: "is_first_marriage",
  AE: "any_other_details",
  AF: "photo_1", // new
  AG: "photo_2", // new
  AH: "photo_3",
  AI: "is_active", // last column
};
