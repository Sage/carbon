import { LayoutProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

export const layoutPropertyNames = [
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "size",
  "display",
  "verticalAlign",
  "overflow",
  "overflowX",
  "overflowY",
];

export default function filterStyledSystemLayoutProps(
  originalObject: Record<string, unknown> | LayoutProps
): LayoutProps {
  return filterObjectProperties(originalObject, layoutPropertyNames);
}
