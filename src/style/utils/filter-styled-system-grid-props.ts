import { GridProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

const gridPropertyNames = [
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
