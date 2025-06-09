import getAccessibleForegroundColor from "../../../style/utils/get-accessible-foreground-color";

const getColoursForPortrait = (
  // The custom background colour, if any
  backgroundColour: string | undefined,
  // Whether the portrait is on a dark background
  darkBackground = false,
  // Whether the text is large
  largeText = false,
  /**
   * Whether to use strict contrast (i.e., WCAG AAA). If this is false, it uses WCAG AA contrast
   * ratios (4.5:1 for normal text, 3:1 for large text). If true, it uses 7:1 for normal text and
   * 4.5:1 for large text.
   */
  strict = false,
  // The custom foreground colour, if any
  foregroundColor: string | undefined = undefined,
): string => {
  let fgColor = "var(--colorsUtilityYin090)";
  let bgColor = "var(--colorsUtilityReadOnly400)";

  if (darkBackground && !backgroundColour && !foregroundColor) {
    bgColor = "var(--colorsUtilityYin090)";
    fgColor = "var(--colorsUtilityReadOnly600)";
  }

  if (backgroundColour) {
    bgColor = backgroundColour;
    fgColor = getAccessibleForegroundColor(backgroundColour, largeText, strict);
  }

  if (foregroundColor) {
    fgColor = foregroundColor;
  }

  return `background-color: ${bgColor}; color: ${fgColor};`;
};

export default getColoursForPortrait;
