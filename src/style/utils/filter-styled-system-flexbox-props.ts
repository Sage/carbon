import { FlexboxProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

const flexboxPropertyNames = [
  "alignItems",
  "alignContent",
  "justifyItems",
  "justifyContent",
  "flexWrap",
  "flexDirection",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "justifySelf",
  "alignSelf",
  "order",
];

export default function filterStyledSystemFlexboxProps(
  originalObject: Record<string, unknown> | FlexboxProps,
): FlexboxProps {
  return filterObjectProperties(originalObject, flexboxPropertyNames);
}
