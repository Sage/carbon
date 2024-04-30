import { space } from "../../style/themes/base/base-theme.config";

export const GAP_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export type AllowedNumericalValues = (typeof GAP_VALUES)[number];
export type Gap = AllowedNumericalValues | string;

export const getGapValue = (gapValue: number | string) =>
  typeof gapValue === "number" ? `var(--spacing${gapValue}00)` : gapValue;

export default function gap(gapValue: number | string): string {
  if (typeof gapValue === "number") {
    return space[gapValue];
  }

  return gapValue;
}
