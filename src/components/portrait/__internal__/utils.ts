const getContrastRatio = (luminance1: number, luminance2: number): number => {
  const [L1, L2] =
    luminance1 > luminance2
      ? [luminance1, luminance2]
      : [luminance2, luminance1];
  return (L1 + 0.05) / (L2 + 0.05);
};

const calculateLuminance = (hexColor: string): number => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const normalize = (value: number): number => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };

  const normalizedR = normalize(r);
  const normalizedG = normalize(g);
  const normalizedB = normalize(b);

  const luminance =
    0.2126 * normalizedR + 0.7152 * normalizedG + 0.0722 * normalizedB;

  return luminance;
};

function getAccessibleForegroundColor(
  backgroundColor: string,
  largeText: boolean,
  strict: boolean,
): string {
  const bgLuminance = calculateLuminance(backgroundColor);
  const whiteLuminance = calculateLuminance("#FFFFFF");
  const blackLuminance = calculateLuminance("#000000");

  const whiteContrast = getContrastRatio(bgLuminance, whiteLuminance);
  const blackContrast = getContrastRatio(bgLuminance, blackLuminance);

  const strictThreshold = largeText ? 4.5 : 7.0;
  const nonStrictThreshold = largeText ? 3.0 : 4.5;
  const minContrast = strict ? strictThreshold : nonStrictThreshold;

  /* istanbul ignore else */
  if (whiteContrast >= minContrast && whiteContrast > blackContrast) {
    return "#FFFFFF";
  }

  /* istanbul ignore else */
  if (blackContrast >= minContrast) {
    return "var(--colorsUtilityYin090)";
  }

  // If no color meets the contrast ratio, return the color with the highest contrast
  // In theory this is possible only if the background color is a shade of grey, but
  // this is a fallback mechanism as finding a colour which fails both contrast ratios
  // is highly unlikely.
  /* istanbul ignore next */
  return whiteContrast > blackContrast
    ? "#FFFFFF"
    : "var(--colorsUtilityYin090)";
}

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
