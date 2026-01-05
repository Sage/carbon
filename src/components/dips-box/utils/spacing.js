import { css } from "styled-components";

// Keys we support (short + longhand)
const spacingKeys = {
  // margin shorthands
  m: "margin",
  mt: "margin-top",
  mr: "margin-right",
  mb: "margin-bottom",
  ml: "margin-left",
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  // padding shorthands
  p: "padding",
  pt: "padding-top",
  pr: "padding-right",
  pb: "padding-bottom",
  pl: "padding-left",
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  // longhand
  margin: "margin",
  marginTop: "margin-top",
  marginRight: "margin-right",
  marginBottom: "margin-bottom",
  marginLeft: "margin-left",
  padding: "padding",
  paddingTop: "padding-top",
  paddingRight: "padding-right",
  paddingBottom: "padding-bottom",
  paddingLeft: "padding-left",
};

const flexboxKeys = {
  alignContent: "align-content",
  justifyItems: "justify-items",
  alignItems: "align-items",
  justifySelf: "justify-self",
  justifyContent: "justify-content",
  flexDirection: "flex-direction",
  flexWrap: "flex-wrap",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
  alignSelf: "align-self",
  order: "order",
  gap: "gap",
  rowGap: "row-gap",
  columnGap: "column-gap",
  display: "display",
  flex: "flex",
  placeItems: "place-items",
  placeContent: "place-content",
  placeSelf: "place-self",
  inlineFlex: "inline-flex",
};

const layoutKeys = {
  width: "width",
  minWidth: "min-width",
  maxWidth: "max-width",
  height: "height",
  minHeight: "min-height",
  maxHeight: "max-height",
  boxSizing: "box-sizing",
  overflow: "overflow",
  overflowX: "overflow-x",
  overflowY: "overflow-y",
  display: "display",
  verticalAlign: "vertical-align",
  visibility: "visibility",
  aspectRatio: "aspect-ratio",
};

/**
 * Convert a spacing value using theme.space array or fallback to 8px multiplier:
 *  - numbers are used as index into theme.space array (if available)
 *  - if no space array, multiply by 8
 *  - strings like '1rem', 'auto' are passed through
 */
export function resolveSpacingValue(value, theme) {
  if (typeof value === "number") {
    // Use theme.space array if available
    if (theme?.space && Array.isArray(theme.space)) {
      return theme.space[value] ?? `${value * 8}px`;
    }
    // Fallback to 8px multiplier
    return value * 8;
  }
  return value;
}

/**
 * Apply spacing styles to props.
 * Usage: `${(props) => spacingCss(props)}` in a styled component.
 */
export function spacingCss(props) {
  const style = {};

  for (const key in spacingKeys) {
    const value = props[key];
    if (!value) continue;

    const cssKeys = spacingKeys[key];
    const resolved = resolveSpacingValue(value, props.theme);

    if (Array.isArray(cssKeys)) {
      cssKeys.forEach((cssKey) => {
        style[cssKey] = resolved;
      });
    } else {
      style[cssKeys] = resolved;
    }
  }

  return css`
    ${Object.entries(style)
      .map(
        ([key, value]) =>
          `${key}: ${typeof value === "number" ? `${value}px` : value};`,
      )
      .join("\n")}
  `;
}

/** CSS properties that are numbers and must NOT have a `px` suffix */
const PropertyWithoutSuffix = new Set(["order", "flex-grow", "flex-shrink"]);

/** Format a single value for output */
function formatValue(cssKey, value) {
  if (typeof value === "number") {
    // If it's suffix-less return as raw number
    if (PropertyWithoutSuffix.has(cssKey)) return String(value);

    // 0 is special: "0" is valid everywhere
    if (value === 0) return "0";

    // default: pixels
    return `${value}px`;
  }

  return String(value);
}

/**
 * Apply flexbox styles.
 * Usage: `${(props) => flexboxCss(props)}` in a styled component.
 */
export function flexboxCss(props) {
  const style = {};
  for (const key in flexboxKeys) {
    const value = props[key];
    if (!value) continue;
    style[flexboxKeys[key]] = value;
  }

  return css`
    ${Object.entries(style)
      .map(([key, value]) => `${key}: ${formatValue(key, value)};`)
      .join("\n")}
  `;
}

/**
 * Apply layout styles.
 * Usage: `${(props) => layoutCss(props)}` in a styled component.
 */
export function layoutCss(props) {
  const style = {};

  for (const key in layoutKeys) {
    const value = props[key];
    if (!value) continue;

    const cssKey = layoutKeys[key];
    style[cssKey] = value;
  }

  return css`
    ${Object.entries(style)
      .map(([key, value]) => `${key}: ${formatValue(key, value)};`)
      .join("\n")}
  `;
}
