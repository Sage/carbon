import {
  getScaleValue,
  isResponsiveObject,
  responsiveStyle,
  sortResponsiveRules,
  type StylePropTheme,
  mergeStyleObjects,
  type ResponsiveValue,
  type StyleObject,
} from "./style-prop-compat";
import { defaultSpace } from "./style-prop-defaults";

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

type SpacingTheme = StylePropTheme;
type PropsWithTheme = { theme?: SpacingTheme };
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
  const negative = typeof value === "number" && value < 0;
  const lookup = negative ? Math.abs(value) : value;
  const space = theme?.space ?? defaultSpace;
  const resolved = getScaleValue(lookup, space);
  if (resolved !== undefined) {
    if (!negative)
      return typeof resolved === "number" ? `${resolved}px` : resolved;
    return typeof resolved === "number" ? `${-resolved}px` : `-${resolved}`;
  }
  if (typeof value === "string")
    return Object.prototype.hasOwnProperty.call(spacingTokenValues, value)
      ? spacingTokenValues[value as SpacingToken]
      : value;
  return `${value}px`;
};

const create = <T extends object & PropsWithTheme>(
  props: T,
  supported?: string[],
): StyleObject => {
  let hasResponsiveObject = false;
  const rules = Object.entries(props).reduce<StyleObject>(
    (result, [prop, raw]) => {
      if (
        !Object.prototype.hasOwnProperty.call(properties, prop) ||
        raw === undefined ||
        (supported && !supported.includes(prop))
      )
        return result;
      const value = raw as ResponsiveSpacingValue;
      hasResponsiveObject ||= isResponsiveObject(value);
      const outputs = properties[prop];
      (Array.isArray(outputs) ? outputs : [outputs]).forEach((property) => {
        mergeStyleObjects(
          result,
          responsiveStyle(property, value, props.theme, (item) => {
            // Negative scale indexing is a margin transform, not a padding transform.
            if (
              property.startsWith("padding") &&
              typeof item === "number" &&
              item < 0
            ) {
              const resolved =
                getScaleValue(item, props.theme?.space ?? defaultSpace) ?? item;
              return typeof resolved === "number" ? `${resolved}px` : resolved;
            }
            return resolveSpacingValue(item, props.theme);
          }),
        );
      });
      return result;
    },
    {},
  );
  return hasResponsiveObject ? sortResponsiveRules(rules) : rules;
};
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
