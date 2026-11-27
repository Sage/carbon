import tokens from "@sage/design-tokens/js/base/es6.js";

export default (color: string): string => {
  if (color.startsWith("var")) {
    return tokens[
      color.replace("var(--", "").replace(")", "") as keyof typeof tokens
    ];
  }

  return color;
};
