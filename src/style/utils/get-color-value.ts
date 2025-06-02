import tokens from "@sage/design-tokens-legacy/js/base/common";

export default (color: string): string => {
  if (color.startsWith("var")) {
    return tokens[
      color.replace("var(--", "").replace(")", "") as keyof typeof tokens
    ];
  }

  return color;
};
