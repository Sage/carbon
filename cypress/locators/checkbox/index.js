import { CHECKBOXCOMPONENT, CHECKBOXROLE, CHECKBOXGROUP } from "./locators";

// component preview locators
export const checkboxComponent = () => cy.get(CHECKBOXCOMPONENT);
export const checkboxRole = () => cy.get(CHECKBOXROLE);
export const checkboxLabel = () => checkboxComponent().find("label");
export const checkboxInlineFieldHelp = () => checkboxComponent().find("span");
export const checkboxIcon = () =>
  checkboxComponent().find("span[data-component='icon']");
export const checkboxSvg = () => checkboxComponent().find("svg");
export const checkboxHelpIcon = () =>
  checkboxComponent().find("[data-component='help']");

export const checkboxGroup = () => cy.get(CHECKBOXGROUP);
export const checkboxgroupLegend = () => checkboxGroup().find("legend");
export const checkboxGroupIcon = () =>
  checkboxGroup().find("span[data-component='icon']");
