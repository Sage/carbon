import {
  SETTINGS_ROW_COMPONENT,
  SETTINGS_ROW_CHILDREN,
  SETTINGS_ROW_DESCRIPTION,
} from "./locators";

// component preview locators
export const settingsRowPreview = () => cy.get(SETTINGS_ROW_COMPONENT);
export const settingsRowChildren = () => cy.get(SETTINGS_ROW_CHILDREN);
export const settingsRowDescription = () => cy.get(SETTINGS_ROW_DESCRIPTION);
