import {
  isUnsafeStyleObjectKey,
  mergeStyleObjects,
  type ResponsiveValue,
  type StyleObject,
} from "./style-prop-compat";

export const spacingTokenValues = {
  none: "var(--global-space-none)",
  "3xs": "var(--global-space-layout-3-xs)",
  "2xs": "var(--global-space-layout-2-xs)",
  xs: "var(--global-space-layout-xs)",
  s: "var(--global-space-layout-s)",
  m: "var(--global-space-layout-m)",
  l: "var(--global-space-layout-l)",
  xl: "var(--global-space-layout-xl)",
  "2xl": "var(--global-space-layout-2-xl)",
  "3xl": "var(--global-space-layout-3-xl)",
  "4xl": "var(--global-space-layout-4-xl)",
} as const;

export type SpacingToken = keyof typeof spacingTokenValues;
export type SpacingValue = SpacingToken | string | number | symbol;
export type ResponsiveSpacingValue = ResponsiveValue<SpacingValue>;
type SpacingProperty = ResponsiveSpacingValue | undefined;

export interface MarginProps {
  m?: SpacingProperty;
  margin?: SpacingProperty;
  mt?: SpacingProperty;
  marginTop?: SpacingProperty;
  mr?: SpacingProperty;
  marginRight?: SpacingProperty;
  mb?: SpacingProperty;
  marginBottom?: SpacingProperty;
  ml?: SpacingProperty;
  marginLeft?: SpacingProperty;
  mx?: SpacingProperty;
  marginX?: SpacingProperty;
  my?: SpacingProperty;
  marginY?: SpacingProperty;
}
export interface PaddingProps {
  p?: SpacingProperty;
  padding?: SpacingProperty;
  pt?: SpacingProperty;
  paddingTop?: SpacingProperty;
  pr?: SpacingProperty;
  paddingRight?: SpacingProperty;
  pb?: SpacingProperty;
  paddingBottom?: SpacingProperty;
  pl?: SpacingProperty;
  paddingLeft?: SpacingProperty;
  px?: SpacingProperty;
  paddingX?: SpacingProperty;
  py?: SpacingProperty;
  paddingY?: SpacingProperty;
}
export type SpaceProps = MarginProps & PaddingProps;

type SpacingTheme = {
  space?: Array<string | number> | Record<string, string | number>;
  breakpoints?: Array<string | number> | Record<string, string | number>;
  mediaQueries?: Record<string, string>;
};
type PropsWithTheme = { theme?: SpacingTheme };
const defaultSpace = [0, 4, 8, 16, 32, 64, 128, 256, 512];
const properties: Record<string, string | string[]> = {
  m: "margin",
  margin: "margin",
  mx: ["margin-left", "margin-right"],
  marginX: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  marginY: ["margin-top", "margin-bottom"],
  mt: "margin-top",
  mr: "margin-right",
  mb: "margin-bottom",
  ml: "margin-left",
  marginTop: "margin-top",
  marginRight: "margin-right",
  marginBottom: "margin-bottom",
  marginLeft: "margin-left",
  p: "padding",
  padding: "padding",
  px: ["padding-left", "padding-right"],
  paddingX: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  paddingY: ["padding-top", "padding-bottom"],
  pt: "padding-top",
  pr: "padding-right",
  pb: "padding-bottom",
  pl: "padding-left",
  paddingTop: "padding-top",
  paddingRight: "padding-right",
  paddingBottom: "padding-bottom",
  paddingLeft: "padding-left",
};

export const resolveSpacingValue = (
  value: SpacingValue,
  theme?: SpacingTheme,
): string | number => {
  if (typeof value === "symbol") return String(value);
  if (value === 0) return "0px";
  const negative = typeof value === "number" && value < 0;
  const lookup = negative ? Math.abs(value) : value;
  const space = theme?.space ?? defaultSpace;
  const resolved = Array.isArray(space)
    ? space[typeof lookup === "number" ? lookup : Number(lookup)]
    : space[String(lookup)];
  if (resolved !== undefined) {
    if (!negative)
      return typeof resolved === "number" ? `${resolved}px` : resolved;
    return typeof resolved === "number" ? `-${resolved}px` : `-${resolved}`;
  }
  if (typeof value === "string")
    return value in spacingTokenValues
      ? spacingTokenValues[value as SpacingToken]
      : value;
  return `${value}px`;
};

const merge = mergeStyleObjects;
const declarations = (
  property: string | string[],
  value: SpacingValue,
  theme?: SpacingTheme,
): StyleObject =>
  (Array.isArray(property) ? property : [property]).reduce<StyleObject>(
    (result, name) => ({
      ...result,
      [name]: resolveSpacingValue(value, theme),
    }),
    {},
  );
const breakpoint = (theme: SpacingTheme | undefined, index: number) =>
  Array.isArray(theme?.breakpoints)
    ? theme.breakpoints[index - 1]
    : theme?.breakpoints
      ? Object.values(theme.breakpoints)[index - 1]
      : ["40em", "52em", "64em"][index - 1];

const responsive = (
  property: string | string[],
  value: ResponsiveSpacingValue,
  theme?: SpacingTheme,
): StyleObject => {
  if (value === null) return {};
  if (Array.isArray(value))
    return value.reduce<StyleObject>((result, item, index) => {
      if (item === null || item === undefined) return result;
      const rule = declarations(property, item, theme);
      if (index === 0) return merge(result, rule);
      const point = breakpoint(theme, index);
      return point
        ? merge(result, { [`@media screen and (min-width: ${point})`]: rule })
        : merge(result, rule);
    }, {});
  if (typeof value === "object")
    return Object.entries(value).reduce<StyleObject>((result, [key, item]) => {
      if (item === undefined || isUnsafeStyleObjectKey(key)) return result;
      const rule = declarations(property, item, theme);
      if (key === "_") return merge(result, rule);
      const query = theme?.mediaQueries?.[key];
      const point = Array.isArray(theme?.breakpoints)
        ? (theme.breakpoints as unknown as Record<string, string | number>)[key]
        : theme?.breakpoints?.[key];
      if (query)
        return merge(result, {
          [`@media ${query.replace(/^@media\s+/, "")}`]: rule,
        });
      return point
        ? merge(result, { [`@media screen and (min-width: ${point})`]: rule })
        : merge(result, rule);
    }, {});
  return declarations(property, value, theme);
};

const create = <T extends object & PropsWithTheme>(
  props: T,
  supported?: string[],
): StyleObject =>
  Object.entries(
    props as Record<string, ResponsiveSpacingValue | undefined>,
  ).reduce<StyleObject>((result, [prop, value]) => {
    const property = properties[prop];
    return !property ||
      value === undefined ||
      (supported && !supported.includes(prop))
      ? result
      : merge(result, responsive(property, value, props.theme));
  }, {});
export const spacingCss = <T extends object & PropsWithTheme>(props: T) =>
  create(props);
export const space = spacingCss;
const marginProperties = Object.keys(properties).filter(
  (property) => property.startsWith("m") || property === "margin",
);
const paddingProperties = Object.keys(properties).filter(
  (property) => property.startsWith("p") || property === "padding",
);
export const margin = <T extends object & PropsWithTheme>(props: T) =>
  create(props, marginProperties);
export const padding = <T extends object & PropsWithTheme>(props: T) =>
  create(props, paddingProperties);
