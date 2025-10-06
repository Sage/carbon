import { css } from "styled-components";

/** If we want to add TS support, we can use this. For now, leaving out to avoid complexity in JS life.
 * Size range from XS to XL
 * export type SpacingSize = "3XS" | "2XS" | "XS" | "S" | "M" | "L" | "XL"| "2XL" | "3XL" | "4XL";
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

/** If we want to add TS support, we can use this. For now, leaving out to avoid complexity in JS life.
 * type Scale =
 *   | number
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

// For styled-components. I'm not sure we will need this if we move away from styled-components.
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
