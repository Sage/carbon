import { AdaptiveSidebarProps } from "../adaptive-sidebar.component";

export const getColors = (
  backgroundColor: AdaptiveSidebarProps["backgroundColor"],
) => {
  switch (backgroundColor) {
    case "app":
      return {
        "background-color": "var(--colorsUtilityMajor025)",
        color: "var(--colorsUtilityYin090)",
      };
    case "black":
      return {
        "background-color": "var(--colorsUtilityYin100)",
        color: "var(--colorsUtilityYang100)",
      };
    case "white":
    default:
      return {
        "background-color": "var(--colorsUtilityYang100)",
        color: "var(--colorsUtilityYin090)",
      };
  }
};

export const kebabToCamelCase = (str: string) => {
  return str.replace(/-./g, (match) => match.charAt(1).toUpperCase());
};
