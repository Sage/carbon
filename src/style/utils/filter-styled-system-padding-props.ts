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
  // method should accept any react prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>
): PaddingProps {
  return filterObjectProperties(props, paddingPropertyNames);
}
