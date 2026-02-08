import type { Gender } from "@/machines/types";

const MALE_VALUES = new Set(["male", "m", "guy"]);
const FEMALE_VALUES = new Set(["female", "f", "girl"]);

export function parseGenderParam(searchParams: URLSearchParams): Gender | null {
  const genderValue = searchParams.get("gender") || searchParams.get("g") || "";
  const normalized = genderValue.toLowerCase().trim();

  if (MALE_VALUES.has(normalized)) {
    return "male";
  }
  if (FEMALE_VALUES.has(normalized)) {
    return "female";
  }
  return null;
}
