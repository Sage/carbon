import { PaddingProps } from "styled-system";
import filterObjectProperties from "../../__internal__/filter-object-properties";

export const paddingNames: (keyof PaddingProps)[] = ["p", "padding"];

export const paddingLeftPropertyNames: (keyof PaddingProps)[] = [
  "pl",
  "paddingLeft",
];

export const paddingRightPropertyNames: (keyof PaddingProps)[] = [
  "pr",
  "paddingRight",
];

export const paddingXPropertyNames: (keyof PaddingProps)[] = ["px", "paddingX"];

const paddingHorizontalPropertyNames = [
  ...paddingLeftPropertyNames,
  ...paddingRightPropertyNames,
  ...paddingXPropertyNames,
];

export const paddingTopPropertyNames: (keyof PaddingProps)[] = [
  "pt",
  "paddingTop",
];

export const paddingBottomPropertyNames: (keyof PaddingProps)[] = [
  "pb",
  "paddingBottom",
];

export const paddingYPropertyNames: (keyof PaddingProps)[] = ["py", "paddingY"];

const paddingVerticalPropertyNames = [
  ...paddingTopPropertyNames,
  ...paddingBottomPropertyNames,
  ...paddingYPropertyNames,
];

export const paddingPropertyNames = [
  ...paddingNames,
  ...paddingHorizontalPropertyNames,
  ...paddingVerticalPropertyNames,
];

export default function filterStyledSystemPaddingProps(
  props: Record<string, unknown> | PaddingProps,
): PaddingProps {
  return filterObjectProperties(props, paddingPropertyNames);
}
