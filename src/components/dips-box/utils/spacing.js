import { css } from "styled-components";

const spacingKeys = {
  m: "margin",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
  p: "padding",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
};

export function getSpacingStyles(props, scale = 8) {
  const style = {};

  for (const key in spacingKeys) {
    const value = props[key];
    if (value != null) {
      const cssKeys = spacingKeys[key];
      const resolveValue = (v) => {
        if (typeof v === "string") return v;
        if (typeof scale === "function") return scale(v);
        if (Array.isArray(scale)) return scale[v] ?? v;
        if (typeof scale === "number") return v * scale;
        return v;
      };

      const resolved = resolveValue(value);

      if (Array.isArray(cssKeys)) {
        cssKeys.forEach((cssKey) => {
          style[cssKey] = resolved;
        });
      } else {
        style[cssKeys] = resolved;
      }
    }
  }

  return style;
}

// We will not need this function when we move away from styled-components.
// For plain old CSS, we can use the getSpacingStyles function directly.
export function spacingCss(props, scale = 8) {
  const styles = getSpacingStyles(props, scale);
  return css`
    ${Object.entries(styles)
      .map(
        ([key, value]) =>
          `${key}: ${typeof value === "number" ? `${value}px` : value};`,
      )
      .join("\n")}
  `;
}
