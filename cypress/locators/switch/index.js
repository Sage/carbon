import SWITCH_DATA_COMPONENT from "./locators";

// component preview locators
export const switchDataComponent = () => cy.get(SWITCH_DATA_COMPONENT);
export const switchInput = () => switchDataComponent().find("input");
export const switchLoading = () =>
  switchDataComponent().find("div > div > div > div > span > div").children();
export const switchLabel = () => switchDataComponent().find("label");
export const switchHelpIcon = () =>
  switchDataComponent().find("[data-component='help']");
export const switchIcon = () =>
  switchDataComponent().find("span[data-component='icon']");
export const switchSvg = () => switchDataComponent().find("svg");
