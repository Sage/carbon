import getAccessibleForegroundColor from "../../../style/utils/get-accessible-foreground-color";

import type {
  PortraitSizes,
  PortraitShapes,
  PortraitVariant,
} from "../portrait.component";

type GetPortraitColors = {
  backgroundColor: string;
  color: string;
};

type GetPortraitDimensions = {
  height: string;
  width: string;
};

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

export const getPortraitBorderRadius = (shape?: PortraitShapes): string => {
  if (shape === "square") {
    return "var(--global-radius-container-m)";
  }

  return "var(--global-radius-container-circle)";
};

export const getPortraitColors = (
  variant?: PortraitVariant,
): GetPortraitColors => {
  const portraitColors: GetPortraitColors = {
    backgroundColor: "inherit",
    color: "inherit",
  };

  if (variant === "black") {
    portraitColors.backgroundColor = "var(--profile-bg-def)";
    portraitColors.color = "var(--profile-label-default)";
  } else {
    portraitColors.backgroundColor = `var(--profile-swatches-${variant}-bg-default)`;
    portraitColors.color = `var(--profile-swatches-${variant}-label-default)`;
  }

  return portraitColors;
};

export const getPortraitDimensions = (
  size: PortraitSizes,
): GetPortraitDimensions => {
  return {
    height: `var(--profile-size-outside-${size.toLowerCase()})`,
    width: `var(--profile-size-outside-${size.toLowerCase()})`,
  };
};

export const getPortraitFontSize = (size: PortraitSizes): string => {
  return `var(--profile-font-initials-${size.toLowerCase()})`;
};

export const getPortraitIconFontSize = (size: PortraitSizes): string => {
  switch (size) {
    case "XS":
      return "var(--global-size-3-xs)";
    case "S":
      return "var(--global-size-2-xs)";
    case "ML":
      return "var(--global-size-s)";
    case "L":
      return "var(--global-size-m)";
    case "XL":
      return "var(--global-size-xl)";
    case "XXL":
      return "var(--global-size-2-xl)";
    default:
      return "var(--global-size-xs)";
  }
};

export default getColoursForPortrait;
