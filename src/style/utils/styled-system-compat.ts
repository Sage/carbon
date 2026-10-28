import { css, FlattenSimpleInterpolation } from "styled-components";
import { margin, padding, space } from "./spacing";
export type { MarginProps, PaddingProps, SpaceProps } from "./spacing";

export { margin, padding, space };

type CSSValue = string | number;
export type ResponsiveValue<T = CSSValue> =
  | T
  | null
  | Array<T | null>
  | Record<string, T | undefined>;

export interface LayoutProps {
  width?: ResponsiveValue;
  height?: ResponsiveValue;
  minWidth?: ResponsiveValue;
  minHeight?: ResponsiveValue;
  maxWidth?: ResponsiveValue;
  maxHeight?: ResponsiveValue;
  size?: ResponsiveValue;
  display?: ResponsiveValue;
  verticalAlign?: ResponsiveValue;
  overflow?: ResponsiveValue;
  overflowX?: ResponsiveValue;
  overflowY?: ResponsiveValue;
}
export interface FlexboxProps {
  alignItems?: ResponsiveValue;
  alignContent?: ResponsiveValue;
  justifyItems?: ResponsiveValue;
  justifyContent?: ResponsiveValue;
  flexWrap?: ResponsiveValue;
  flexDirection?: ResponsiveValue;
  flex?: ResponsiveValue;
  flexGrow?: ResponsiveValue;
  flexShrink?: ResponsiveValue;
  flexBasis?: ResponsiveValue;
  justifySelf?: ResponsiveValue;
  alignSelf?: ResponsiveValue;
  order?: ResponsiveValue;
}
export interface PositionProps {
  position?: string;
  top?: CSSValue;
  right?: CSSValue;
  bottom?: CSSValue;
  left?: CSSValue;
  zIndex?: CSSValue;
}
export interface GridProps {
  gridColumn?: ResponsiveValue;
  gridRow?: ResponsiveValue;
  gridArea?: ResponsiveValue;
  gridAutoFlow?: ResponsiveValue;
  gridAutoRows?: ResponsiveValue;
  gridAutoColumns?: ResponsiveValue;
  gridTemplateRows?: ResponsiveValue;
  gridTemplateColumns?: ResponsiveValue;
  gridTemplateAreas?: ResponsiveValue;
  gridGap?: ResponsiveValue;
  gridRowGap?: ResponsiveValue;
  gridColumnGap?: ResponsiveValue;
}
export interface GridAreaProps {
  gridArea?: ResponsiveValue;
}
export interface GridColumnProps {
  gridColumn?: ResponsiveValue;
}
export interface GridRowProps {
  gridRow?: ResponsiveValue;
}
export interface WidthProps {
  width?: ResponsiveValue;
}
export interface MaxWidthProps {
  maxWidth?: ResponsiveValue;
}
export interface BackgroundProps {
  background?: ResponsiveValue;
  backgroundColor?: ResponsiveValue;
  backgroundImage?: ResponsiveValue;
  backgroundSize?: ResponsiveValue;
  backgroundPosition?: ResponsiveValue;
  backgroundRepeat?: ResponsiveValue;
}
export interface BorderProps {
  border?: ResponsiveValue;
  borderColor?: ResponsiveValue;
  borderRadius?: ResponsiveValue;
  borderStyle?: ResponsiveValue;
  borderWidth?: ResponsiveValue;
}
export interface TypographyProps {
  fontFamily?: ResponsiveValue;
  fontSize?: ResponsiveValue;
  fontWeight?: ResponsiveValue;
  lineHeight?: ResponsiveValue;
  letterSpacing?: ResponsiveValue;
  textAlign?: ResponsiveValue;
  fontStyle?: ResponsiveValue;
}
export interface ColorProps {
  color?: ResponsiveValue;
  bg?: ResponsiveValue;
  backgroundColor?: ResponsiveValue;
  opacity?: ResponsiveValue;
}
export type styleFn = FlattenSimpleInterpolation;

type Theme = {
  breakpoints?: Array<string | number> | Record<string, string | number>;
  mediaQueries?: Record<string, string>;
  sizes?: Array<CSSValue> | Record<string, CSSValue>;
  zIndices?: Array<CSSValue> | Record<string, CSSValue>;
  colors?: Record<string, CSSValue>;
};
type Props = { theme?: Theme } & { [key: string]: unknown };
const defaultBreakpoints = ["40em", "52em", "64em"];
const valueFor = (value: CSSValue, property: string) => {
  if (typeof value !== "number") return value;
  if (
    value === 0 ||
    ["flex-grow", "flex-shrink", "order", "z-index"].includes(property)
  )
    return String(value);
  if (
    [
      "width",
      "height",
      "min-width",
      "max-width",
      "min-height",
      "max-height",
    ].includes(property) &&
    value > 0 &&
    value <= 1
  )
    return `${value * 100}%`;
  return `${value}px`;
};
const declaration = (property: string, value: CSSValue) =>
  `${property}: ${valueFor(value, property)};`;
const media = (query: CSSValue) => `@media screen and (min-width: ${query})`;

const renderValue = (
  property: string,
  value: ResponsiveValue,
  theme?: Theme,
): string => {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value))
    return value
      .map((item, index) => {
        if (item === null || item === undefined) return "";
        const rule = declaration(property, item);
        if (index === 0) return rule;
        const breakpoint = Array.isArray(theme?.breakpoints)
          ? theme.breakpoints[index - 1]
          : defaultBreakpoints[index - 1];
        return breakpoint ? `${media(breakpoint)} { ${rule} }` : rule;
      })
      .join("\n");
  if (typeof value === "object")
    return Object.entries(value)
      .map(([key, item]) => {
        if (item === undefined) return "";
        const rule = declaration(property, item);
        if (key === "_") return rule;
        const mediaQuery = theme?.mediaQueries?.[key];
        const namedBreakpoint = !Array.isArray(theme?.breakpoints)
          ? theme?.breakpoints?.[key]
          : undefined;
        return mediaQuery
          ? `@media ${String(mediaQuery).replace(/^@media\s+/, "")} { ${rule} }`
          : namedBreakpoint
            ? `${media(namedBreakpoint)} { ${rule} }`
            : rule;
      })
      .join("\n");
  return declaration(property, value);
};

const system =
  (properties: Record<string, string | string[]>) =>
  (props: object): FlattenSimpleInterpolation => {
    const values = props as Props;
    const rules = Object.entries(properties).flatMap(([prop, output]) => {
      const value = values[prop] as ResponsiveValue | undefined;
      if (value === undefined) return [];
      return (Array.isArray(output) ? output : [output]).map((name) =>
        renderValue(name, value, values.theme),
      );
    });
    return css`
      ${rules.join("\n")}
    `;
  };

export const layout = system({
  width: "width",
  height: "height",
  minWidth: "min-width",
  minHeight: "min-height",
  maxWidth: "max-width",
  maxHeight: "max-height",
  size: ["width", "height"],
  display: "display",
  verticalAlign: "vertical-align",
  overflow: "overflow",
  overflowX: "overflow-x",
  overflowY: "overflow-y",
});
export const flexbox = system({
  alignItems: "align-items",
  alignContent: "align-content",
  justifyItems: "justify-items",
  justifyContent: "justify-content",
  flexWrap: "flex-wrap",
  flexDirection: "flex-direction",
  flex: "flex",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
  justifySelf: "justify-self",
  alignSelf: "align-self",
  order: "order",
});
export const grid = system({
  gridColumn: "grid-column",
  gridRow: "grid-row",
  gridArea: "grid-area",
  gridAutoFlow: "grid-auto-flow",
  gridAutoRows: "grid-auto-rows",
  gridAutoColumns: "grid-auto-columns",
  gridTemplateRows: "grid-template-rows",
  gridTemplateColumns: "grid-template-columns",
  gridTemplateAreas: "grid-template-areas",
  gridGap: "grid-gap",
  gridRowGap: "grid-row-gap",
  gridColumnGap: "grid-column-gap",
});
export const position = (props: PositionProps) => ({
  position: props.position,
  top: props.top,
  right: props.right,
  bottom: props.bottom,
  left: props.left,
  zIndex: props.zIndex,
});
export const background = system({
  background: "background",
  backgroundColor: "background-color",
  backgroundImage: "background-image",
  backgroundSize: "background-size",
  backgroundPosition: "background-position",
  backgroundRepeat: "background-repeat",
});
export const color = (props: {
  theme?: Theme;
  color?: CSSValue;
  bg?: CSSValue;
  backgroundColor?: CSSValue;
  opacity?: CSSValue;
}) => {
  const resolveColor = (value: CSSValue) =>
    String(
      typeof value === "string"
        ? (props.theme?.colors?.[value] ?? value)
        : value,
    );
  const styles: Record<string, string> = {};

  if (props.color !== undefined) styles.color = resolveColor(props.color);
  if (props.bg !== undefined) {
    styles.backgroundColor = resolveColor(props.bg);
  } else if (props.backgroundColor !== undefined) {
    styles.backgroundColor = resolveColor(props.backgroundColor);
  }
  if (props.opacity !== undefined) styles.opacity = String(props.opacity);

  return styles;
};
