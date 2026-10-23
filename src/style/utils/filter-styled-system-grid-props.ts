import { GridProps } from "./styled-system-compat";
import filterObjectProperties from "../../__internal__/filter-object-properties";

export const gridPropertyNames = [
  "gridColumn",
  "gridRow",
  "gridArea",
  "gridAutoFlow",
  "gridAutoRows",
  "gridAutoColumns",
  "gridTemplateRows",
  "gridTemplateColumns",
  "gridTemplateAreas",
];

export default function filterStyledSystemGridProps(
  originalObject: Record<string, unknown> | GridProps,
): GridProps {
  return filterObjectProperties(originalObject, gridPropertyNames);
}
