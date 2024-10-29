import { MarginProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

export const marginPropertyNames = [
  "margin",
  "m",
  "marginLeft",
  "ml",
  "marginRight",
  "mr",
  "marginTop",
  "mt",
  "marginBottom",
  "mb",
  "marginX",
  "mx",
  "marginY",
  "my",
];

export default function filterStyledSystemMarginProps(
  originalObject: Record<string, unknown> | MarginProps,
): MarginProps {
  return filterObjectProperties(originalObject, marginPropertyNames);
}
