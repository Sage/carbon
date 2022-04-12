import { PaddingProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

export const paddingPropertyNames = [
  "padding",
  "p",
  "paddingLeft",
  "pl",
  "paddingRight",
  "pr",
  "paddingTop",
  "pt",
  "paddingBottom",
  "pb",
  "paddingX",
  "px",
  "paddingY",
  "py",
];

export default function filterStyledSystemPaddingProps(
  originalObject: Record<string, unknown>
): PaddingProps {
  return filterObjectProperties(originalObject, paddingPropertyNames);
}
