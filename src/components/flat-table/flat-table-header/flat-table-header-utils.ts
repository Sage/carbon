import { FlatTableProps } from "..";

const getAlternativeBackgroundColor = (
  colorTheme: FlatTableProps["colorTheme"],
) => {
  switch (colorTheme) {
    case "light":
      return "var(--colorsActionMinor100)";

    case "transparent-base":
      return "var(--colorsUtilityMajor025)";

    case "transparent-white":
      return "var(--colorsUtilityYang100)";

    // default theme is "dark"
    default:
      return "var(--colorsActionMinor550)";
  }
};

export default getAlternativeBackgroundColor;
