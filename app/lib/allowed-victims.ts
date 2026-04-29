export const ALLOWED_VICTIMS = [
  "andy",
  "lays",
  "Andy",
  "Lays",
  "Andy Allsopp",
];

export function isAllowedVictim(name: string | null | undefined): boolean {
  if (!name) return false;
  return ALLOWED_VICTIMS.includes(name);
}
