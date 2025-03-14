export const SIZE = {
  EXTRASMALL: "extra-small",
  SMALL: "small",
  MEDIUMSMALL: "medium-small",
  MEDIUM: "medium",
  MEDIUMLARGE: "medium-large",
  LARGE: "large",
  EXTRALARGE: "extra-large",
} as const;

export const VALIDATION = {
  ERROR: "rgb(203, 55, 74)",
  WARNING: "rgb(239, 103, 0)",
  INFO: "rgb(0, 96, 167)",
} as const;

export const COLOR = {
  BLACK: "rgb(0, 0, 0)",
  RED: "rgb(205, 56, 75)",
  ORANGE: "rgb(255, 156, 75)",
  BROWN: "rgb(105, 61, 57)",
  WHITE: "rgb(255, 255, 255)",
} as const;

export const CHARACTERS = {
  DIACRITICS: "mp150ú¿¡üßä",
  SPECIALCHARACTERS: "!@#$%^*()_+-=~[];:.,?{}&\"'<>",
  STANDARD: "playwright_data",
} as const;
