import { css } from "styled-components";
export {
  resolveSpacingValue,
  spacingCss,
} from "../../../../style/utils/spacing";

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
    if (value === null || value === undefined) continue;
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
    if (value === null || value === undefined) continue;

    const cssKey = layoutKeys[key];
    style[cssKey] = value;
  }

  return css`
    ${Object.entries(style)
      .map(([key, value]) => `${key}: ${formatValue(key, value)};`)
      .join("\n")}
  `;
}
