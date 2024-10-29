import { PositionProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

export const positionPropertyNames = [
  "top",
  "right",
  "bottom",
  "left",
  "position",
];

export default function filterStyledSystemPositionProps(
  originalObject: Record<string, unknown> | PositionProps,
): PositionProps {
  return filterObjectProperties(originalObject, positionPropertyNames);
}
