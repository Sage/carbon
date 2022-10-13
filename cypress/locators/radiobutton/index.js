import {
  RADIOBUTTONGROUP,
  RADIOBUTTONCOMPONENT,
  RADIOBUTTONROLE,
} from "./locators";

// component preview locators
export const radiobuttonComponent = () => cy.get(RADIOBUTTONCOMPONENT);
export const radiobuttonRole = () => cy.get(RADIOBUTTONROLE);
export const radiobuttonLabel = () => radiobuttonComponent().find("label");
export const radiobuttonInlineFieldHelp = () =>
  radiobuttonComponent().find("span");
export const radiobuttonIcon = () =>
  radiobuttonComponent().find("span[data-component='icon']");
export const radiobuttonSvg = () => radiobuttonComponent().find("svg");
export const radiobuttonHelpIcon = () =>
  radiobuttonComponent().find("[data-component='help']");

export const radiobuttonGroup = () => cy.get(RADIOBUTTONGROUP);
export const radiobuttonGroupLegend = () => radiobuttonGroup().find("legend");
export const radiobuttonGroupIcon = () =>
  radiobuttonGroup().find("span[data-component='icon']");
export const radiobutton = (index) => cy.get(RADIOBUTTONCOMPONENT).eq(index);
