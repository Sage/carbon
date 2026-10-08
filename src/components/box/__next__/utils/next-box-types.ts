export type {
  MarginProps,
  PaddingProps,
  SpaceProps,
} from "../../../../style/utils/spacing";

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
  flexGrow?: string;
  /** Short hand `flex-shrink` property */
  flexShrink?: string;
  /** Short hand `flex-basis` property */
  flexBasis?: string;
  /** Short hand `flex` property */
  flex?: string;
  /** Short hand `align-self` property */
  alignSelf?: string;
  /** Short hand `order` property */
  order?: string;
}

export interface LayoutProps {
  /** Short hand `width` property */
  width?: string;
  /** Short hand `max-width` property */
  maxWidth?: string;
  /** Short hand `min-width` property */
  minWidth?: string;
  /** Short hand `height` property */
  height?: string;
  /** Short hand `max-height` property */
  maxHeight?: string;
  /** Short hand `min-height` property */
  minHeight?: string;
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
