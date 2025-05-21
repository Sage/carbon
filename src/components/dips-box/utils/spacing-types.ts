export interface PaddingProps {
  /** Short hand `padding` property */
  p?: string | number;
  /** Short hand `padding-top` property */
  pt?: string | number;
  /** Short hand `padding-right` property */
  pr?: string | number;
  /** Short hand `padding-bottom` property */
  pb?: string | number;
  /** Short hand `padding-left` property */
  pl?: string | number;
  /** Short hand `padding x-axis` property */
  px?: string | number;
  /** Short hand `padding y-axis` property */
  py?: string | number;
  /** Padding property */
  padding?: string | number;
  /** Padding top property */
  paddingTop?: string | number;
  /** Padding right property */
  paddingRight?: string | number;
  /** Padding bottom property */
  paddingBottom?: string | number;
  /** Padding left property */
  paddingLeft?: string | number;
}

export interface MarginProps {
  /** Short hand `margin` property */
  m?: string | number;
  /** Short hand `margin-top` property */
  mt?: string | number;
  /** Short hand `margin-right` property */
  mr?: string | number;
  /** Short hand `margin-bottom` property */
  mb?: string | number;
  /** Short hand `margin-left` property */
  ml?: string | number;
  /** Short hand `margin x-axis` property */
  mx?: string | number;
  /** Short hand `margin y-axis` property */
  my?: string | number;
  /** Margin property */
  margin?: string | number;
  /** Margin top property */
  marginTop?: string | number;
  /** Margin right property */
  marginRight?: string | number;
  /** Margin bottom property */
  marginBottom?: string | number;
  /** Margin left property */
  marginLeft?: string | number;
}

// Size range from 3XS to 4XL. "none" added to allow zero spacing.
export type SpacingSize =
  | "none"
  | "3XS"
  | "2XS"
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "2XL"
  | "3XL"
  | "4XL";

// Mapping of size to multiplier value for spacing calculations
// 3XS would be 1 * base spacing unit, 2XS would be 2 * base spacing unit, etc.
export const spacingSizeMap: Record<SpacingSize, number> = {
  none: 0,
  "3XS": 1,
  "2XS": 2,
  XS: 3,
  S: 4,
  M: 5,
  L: 6,
  XL: 7,
  "2XL": 8,
  "3XL": 9,
  "4XL": 10,
};

export interface FlexboxProps {
  /** Short hand `align-content` property */
  alignContent?: string;
  /** Short hand `justify-items` property */
  justifyItems?: string;
  /** Short hand `align-items` property */
  alignItems?: string;
  /** Short hand `justify-content` property */
  justifyContent?: string;
  /** Short hand `justify-self` property */
  justifySelf?: string;
  /** Short hand `flex-direction` property */
  flexDirection?: string;
  /** Short hand `flex-wrap` property */
  flexWrap?: string;
  /** Short hand `flex-grow` property */
  flexGrow?: string | number;
  /** Short hand `flex-shrink` property */
  flexShrink?: string | number;
  /** Short hand `flex-basis` property */
  flexBasis?: string | number;
  /** Short hand `flex` property */
  flex?: string;
  /** Short hand `align-self` property */
  alignSelf?: string;
  /** Short hand `order` property */
  order?: string | number;
}

export interface LayoutProps {
  /** Short hand `width` property */
  width?: string | number;
  /** Short hand `max-width` property */
  maxWidth?: string | number;
  /** Short hand `min-width` property */
  minWidth?: string | number;
  /** Short hand `height` property */
  height?: string | number;
  /** Short hand `max-height` property */
  maxHeight?: string | number;
  /** Short hand `min-height` property */
  minHeight?: string | number;
  /** Short hand `display` property */
  display?: string;
  /** Short hand `overflow` property */
  overflow?: string;
  /** Short hand `overflow-x` property */
  overflowX?: string;
  /** Short hand `overflow-y` property */
  overflowY?: string;
  /** Short hand `vertical-align` property */
  verticalAlign?: string;
  /** Short hand `box-sizing` property */
  boxSizing?: string;
  /** Short hand `visibility` property */
  visibility?: string;
  /** Short hand `aspect-ratio` property */
  aspectRatio?: string;
}

export interface MaxWidthProps {
  maxWidth?: string;
}
