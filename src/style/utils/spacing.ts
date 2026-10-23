import { css, FlattenSimpleInterpolation } from "styled-components";

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
export type SpacingValue = SpacingToken | string | number;
export type ResponsiveSpacingValue =
  | SpacingValue
  | null
  | Array<SpacingValue | null>
  | Record<string, SpacingValue | undefined>;

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

const spacingProperties: Record<string, string | string[]> = {
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

function createDeclarationsWithResolver(
  properties: string | string[],
  value: SpacingValue,
  theme: SpacingTheme | undefined,
  resolver: (value: SpacingValue, theme?: SpacingTheme) => SpacingValue,
) {
  return (Array.isArray(properties) ? properties : [properties])
    .map((property) => `${property}: ${resolver(value, theme)};`)
    .join("\n");
}

/**
 * Legacy resolver used by the established component APIs. Numeric values are
 * scale indexes, just as they were with styled-system. CSS strings deliberately
 * pass through unchanged so browsers handle invalid values consistently.
 */
export const resolveSpacingValue = (
  value: SpacingValue,
  theme?: SpacingTheme,
): SpacingValue => {
  if (typeof value === "string") {
    return value in spacingTokenValues
      ? spacingTokenValues[value as SpacingToken]
      : value;
  }

  // styled-system serialises the CSS zero value directly rather than looking
  // it up in the scale. Consumers (and the established component contract)
  // therefore receive `0px`, even though the base scale also has an entry at 0.
  if (value === 0) return "0px";

  const space = theme?.space;
  const spaceValue = Array.isArray(space)
    ? space[Math.abs(value)]
    : space?.[String(Math.abs(value))];
  if (spaceValue !== undefined) {
    return value < 0 ? `-${spaceValue}` : spaceValue;
  }

  // styled-system's default space scale uses four-pixel increments when a
  // component is rendered without a theme. Retain that legacy behaviour for
  // established APIs; token-first APIs use resolveTokenSpacingValue instead.
  return `${value * 4}px`;
};

/** Explicit-pixel resolver for token-first APIs such as NextBox. */
export const resolveTokenSpacingValue = (value: SpacingValue): SpacingValue => {
  if (typeof value === "string") {
    return value in spacingTokenValues
      ? spacingTokenValues[value as SpacingToken]
      : value;
  }

  return `${value}px`;
};

const getBreakpoint = (theme: SpacingTheme | undefined, index: number) => {
  const breakpoints = theme?.breakpoints;
  if (Array.isArray(breakpoints)) return breakpoints[index - 1];
  if (breakpoints) return Object.values(breakpoints)[index - 1];

  return ["40em", "52em", "64em"][index - 1];
};

const createResponsiveDeclarations = (
  properties: string | string[],
  value: ResponsiveSpacingValue,
  theme: SpacingTheme | undefined,
  resolver: (value: SpacingValue, theme?: SpacingTheme) => SpacingValue,
) => {
  if (value === null) return "";

  if (Array.isArray(value)) {
    return value
      .map((item, index) => {
        if (item === null || item === undefined) return "";
        const declarations = createDeclarationsWithResolver(
          properties,
          item,
          theme,
          resolver,
        );
        if (index === 0) return declarations;

        const breakpoint = getBreakpoint(theme, index);
        return breakpoint
          ? `@media screen and (min-width: ${breakpoint}) { ${declarations} }`
          : declarations;
      })
      .join("\n");
  }

  if (typeof value === "object" && value !== null) {
    return Object.entries(value)
      .map(([breakpoint, item]) => {
        if (item === undefined) return "";
        const declarations = createDeclarationsWithResolver(
          properties,
          item,
          theme,
          resolver,
        );
        if (breakpoint === "_") return declarations;

        const mediaQuery = theme?.mediaQueries?.[breakpoint];
        const namedBreakpoint = !Array.isArray(theme?.breakpoints)
          ? theme?.breakpoints?.[breakpoint]
          : undefined;
        return mediaQuery
          ? `@media ${String(mediaQuery).replace(/^@media\s+/, "")} { ${declarations} }`
          : namedBreakpoint
            ? `@media screen and (min-width: ${namedBreakpoint}) { ${declarations} }`
            : declarations;
      })
      .join("\n");
  }

  return createDeclarationsWithResolver(properties, value, theme, resolver);
};

const createSpacingCss = (
  props: object & PropsWithTheme,
  supportedProperties?: string[],
  resolver = resolveSpacingValue,
): FlattenSimpleInterpolation => {
  const declarations: string[] = [];
  const values = props as Record<string, ResponsiveSpacingValue | undefined>;

  Object.entries(values).forEach(([prop, value]) => {
    const properties = spacingProperties[prop];
    if (!properties) return;
    if (supportedProperties && !supportedProperties.includes(prop)) return;
    if (value === undefined) return;

    declarations.push(
      createResponsiveDeclarations(properties, value, props.theme, resolver),
    );
  });

  return css`
    ${declarations.join("\n")}
  `;
};

export const spacingCss = <T extends object & PropsWithTheme>(props: T) =>
  createSpacingCss(props);

export const tokenSpacingCss = <T extends object & PropsWithTheme>(props: T) =>
  createSpacingCss(props, undefined, resolveTokenSpacingValue);

const marginProperties = Object.keys(spacingProperties).filter(
  (property) => property.startsWith("m") || property === "margin",
);
const paddingProperties = Object.keys(spacingProperties).filter(
  (property) => property.startsWith("p") || property === "padding",
);

export const margin = <T extends object & PropsWithTheme>(props: T) =>
  createSpacingCss(props, marginProperties);
export const padding = <T extends object & PropsWithTheme>(props: T) =>
  createSpacingCss(props, paddingProperties);
export const space = <T extends object & PropsWithTheme>(props: T) =>
  createSpacingCss(props);
