import { LayoutProps, PositionProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

const layoutPropertyNames = [
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
  "position",
  "top",
  "right",
  "bottom",
  "left",
];

export default function filterStyledSystemLayoutProps(
  originalObject: Record<string, unknown> | LayoutProps | PositionProps,
): LayoutProps | PositionProps {
  return filterObjectProperties(originalObject, layoutPropertyNames);
}
