import { css } from "styled-components";

/** If we want to add TS support, we can use this. For now, leaving out to avoid complexity in JS life.
 * Size range from XS to XL
 * export type SpacingSize = "none" | "3XS" | "2XS" | "XS" | "S" | "M" | "L" | "XL"| "2XL" | "3XL" | "4XL";
 */

// Mapping of size to multiplier value for spacing calculations
export const spacingSizeMap = {
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
  alignContent: "align-content",
  justifyItems: "justify-items",
  justifySelf: "justify-self",
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

/** If we want to add TS support, we can use this. For now, leaving out to avoid complexity in JS life.
 * type Scale =
 *   | number
 *   | string
 *   | ((n: number) => number | string)
 *   | Array<number | string>;
 */

/** Apply the chosen scale to a numeric step/multiplier */
function applyScale(n, scale) {
  if (typeof scale === "function") return scale(n);
  if (Array.isArray(scale)) {
    // If array scale present, treat 'n' as an index if possible, else fall back to px scaling with base step if numeric
    const candidate = scale[n];
    if (candidate != null) return candidate;
    const first = scale[0];
    if (typeof first === "number") return n * first;
    // If we can't infer a numeric base from array, just return n (spacingCss will handle the rest)
    return n;
  }

  // CSS token string (e.g., "var(--sizing025)")
  if (typeof scale === "string") {
    if (n === 0) return 0; // "0" is fine
    if (n === 1) return scale; // 1 * token -> token
    if (n === -1) return `calc(-1 * ${scale})`; // -1 * token
    return `calc(${n} * ${scale})`; // general case
  }
  // numeric base (e.g., 8 → XS is 3 * 8 = 24)
  return n * scale;
}

/**
 * Convert a single spacing value using:
 *  - symbolic sizes (XS | S | M | L | XL, with optional leading '-' for negative values)
 *  - raw numbers
 *  - or leave arbitrary CSS strings ('1rem', 'auto') untouched
 */
function resolveSpacingValue(value, scale, sizeMap = spacingSizeMap) {
  // Handle numbers directly
  if (typeof value === "number") {
    return applyScale(value, scale);
  }

  // Handle sizing letters (for now this is including negative, e.g. '-M'
  // but that could be removed if we are sure it is not needed)
  const sizingLetters = /^-?(XS|S|M|L|XL)$/.exec(value);
  if (sizingLetters) {
    const sign = value.startsWith("-") ? -1 : 1;
    const token = sizingLetters[1];
    const size = sizeMap[token] ?? 0;
    return applyScale(sign * size, scale);
  }

  // If value is something like '1rem', 'auto', etc., pass through
  return value;
}

export function getSpacingStyles(props, scale = 8, sizeMap = spacingSizeMap) {
  const style = {};

  for (const key in spacingKeys) {
    const value = props[key];
    if (value == null) continue;

    const cssKeys = spacingKeys[key];
    const resolved = resolveSpacingValue(value, scale, sizeMap);

    if (Array.isArray(cssKeys)) {
      cssKeys.forEach((cssKey) => {
        style[cssKey] = resolved;
      });
    } else {
      style[cssKeys] = resolved;
    }
  }

  return style;
}

/**
 * This can be implemented by doing:
 * `${(props) => spacingCss(props)}`
 * in a styled component.
 * To apply a different scale, do:
 * `${(props) => spacingCss(props, 4)}` // for a scale of 4px
 */
// For styled-components.
// I'm not sure we will need this if we move away from styled-components.
export function spacingCss(props, scale = 8, sizeMap = spacingSizeMap) {
  const styles = getSpacingStyles(props, scale, sizeMap);
  return css`
    ${Object.entries(styles)
      .map(
        ([key, value]) =>
          `${key}: ${typeof value === "number" ? `${value}px` : value};`,
      )
      .join("\n")}
  `;
}

/** CSS properties that are numbers and must NOT have a `px, rem` etc etc suffix */
const PropertyWithoutSuffix = new Set(["order", "flex-grow", "flex-shrink"]);

// props that can sensibly accept percentages (add more if you need)
const CapableOfPercentValue = new Set([
  "width",
  "height",
  "min-width",
  "max-width",
  "min-height",
  "max-height",
  "left",
  "right",
  "top",
  "bottom",
  "flex-basis",
]);

/** format a single value for output */
function formatValue(cssKey, value) {
  if (typeof value === "number") {
    // If it's suffix-less return as raw number
    if (PropertyWithoutSuffix.has(cssKey)) return String(value);

    // 0 is special: "0" is valid everywhere
    if (value === 0) return "0";

    // treat numbers in [0, 1] as percentages for percent-capable props
    if (CapableOfPercentValue.has(cssKey)) {
      const epsilon = 1e-9;
      if (value > 0 && value < 1) {
        return `${value * 100}%`;
      }
      if (Math.abs(value - 1) < epsilon) {
        return "100%";
      }
    }

    // default: pixels
    return `${value}px`;
  }

  return String(value);
}

/* Flexbox and Layout support */
export function getFlexboxStyles(props) {
  const style = {};
  for (const key in flexboxKeys) {
    const value = props[key];
    if (value == null) continue;
    style[flexboxKeys[key]] = value;
  }
  return style;
}

/** Apply flexbox styles
 * This can be implemented by doing:
 * `${(props) => flexboxCss(props)}`
 * in a styled component.
 */
// Number has been added to the logic here in case we choose to support numbers. For now flexGrow and flexShrink are string values
// but they are supposed to be numbers in CSS.
export function flexboxCss(props) {
  const styles = getFlexboxStyles(props);
  return css`
    ${Object.entries(styles)
      .map(([key, value]) => `${key}: ${formatValue(key, value)};`)
      .join("\n")}
  `;
}

export function getLayoutStyles(props) {
  const style = {};

  for (const key in layoutKeys) {
    const value = props[key];
    if (value == null) continue;

    const cssKey = layoutKeys[key];
    style[cssKey] = value;
  }

  return style;
}

/** Apply layout styles
 * This can be implemented by doing:
 * `${(props) => layoutCss(props)}`
 * in a styled component.
 */
// Number has been added to the logic here in case we choose to support numbers.
// For now width, height, minWidth, minHeight, maxWidth and maxHeight are string values.
export function layoutCss(props) {
  const styles = getLayoutStyles(props);
  return css`
    ${Object.entries(styles)
      .map(([key, value]) => `${key}: ${formatValue(key, value)};`)
      .join("\n")}
  `;
}
