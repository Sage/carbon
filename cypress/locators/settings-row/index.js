import {
  SETTINGS_ROW_TITLE, SETTINGS_ROW_COMPONENT, SETTINGS_ROW_CHILDREN, SETTINGS_ROW_DESCRIPTION,
} from './locators';

// component preview locators
export const settingsRowTitle = () => cy.iFrame(SETTINGS_ROW_TITLE);
export const settingsRowPreview = () => cy.iFrame(SETTINGS_ROW_COMPONENT);
export const settingsRowChildren = () => cy.iFrame(SETTINGS_ROW_CHILDREN);
export const settingsRowDescription = () => cy.iFrame(SETTINGS_ROW_DESCRIPTION);
