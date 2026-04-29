import type {
  PortraitSize,
  PortraitShape,
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

export const getPortraitBorderRadius = (shape?: PortraitShape): string => {
  if (shape === "square") {
    return "var(--global-radius-container-m)";
  }

  return "var(--global-radius-container-circle)";
};

export const getPortraitColors = (
  variant: PortraitVariant,
): GetPortraitColors => {
  let portraitColors;

  if (variant === "black") {
    portraitColors = {
      backgroundColor: "var(--profile-bg-def)",
      color: "var(--profile-label-default)",
    };
  } else {
    portraitColors = {
      backgroundColor: `var(--profile-swatches-${variant}-bg-default)`,
      color: `var(--profile-swatches-${variant}-label-default)`,
    };
  }

  return portraitColors;
};

export const getPortraitDimensions = (
  size: PortraitSize,
): GetPortraitDimensions => {
  return {
    height: `var(--profile-size-outside-${size.toLowerCase()})`,
    width: `var(--profile-size-outside-${size.toLowerCase()})`,
  };
};

export const getPortraitFontSize = (size: PortraitSize): string => {
  return `var(--profile-font-initials-${size.toLowerCase()})`;
};

export const getPortraitIconFontSize = (size: PortraitSize): string => {
  switch (size) {
    case "XS":
      return "var(--sizing200)";
    case "S":
      return "var(--sizing250)";
    case "ML":
      return "var(--sizing400)";
    case "L":
      return "var(--sizing500)";
    case "XL":
      return "var(--sizing700)";
    case "XXL":
      return "var(--sizing800)";
    default:
      return "var(--sizing300)";
  }
};
