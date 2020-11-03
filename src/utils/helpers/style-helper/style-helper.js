import { aegeanTheme, classicTheme, mintTheme } from "../../../style/themes";

export function isClassic({ name }) {
  return name === classicTheme.name;
}

export function isDLS({ name }) {
  return name === mintTheme.name || name === aegeanTheme.name;
}
