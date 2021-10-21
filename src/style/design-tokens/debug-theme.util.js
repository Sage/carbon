import tokens from "@sage/design-tokens/js/base/common";
import mint from "../themes/mint";

/**
 *
 * Generates debug theme by mapping theme properties, so that components or
 * their parts, that are using old theme properties would be easier to spot.
 *
 * This is temporary utility and will no longer be needed after all components
 * will be migrated to design tokens.
 *
 */

const debugTheme = (themeProperties) =>
  Object.fromEntries(
    Object.entries(themeProperties).map(([key, value]) => {
      if (
        typeof value === "string" &&
        (value.startsWith("#") ||
          value.startsWith("rgb") ||
          value.startsWith("rgba") ||
          value.startsWith("hsl") ||
          value.startsWith("hsla"))
      ) {
        return [key, `rgba(255, 20, 147, .2)`];
      }

      if (typeof value === "string" && value.endsWith("px")) {
        return [key, "10px"];
      }

      if (typeof value === "string" && value.endsWith("%")) {
        return [key, "10%"];
      }

      if (typeof value === "number") {
        return [key, 10];
      }

      if (typeof value === "object") {
        return [key, debugTheme(value)];
      }

      return [key, ""];
    })
  );

export default {
  ...debugTheme(mint),
  ...tokens,
  name: "sage-debug",
};
