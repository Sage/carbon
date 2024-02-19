import {
  BUTTON_TOGGLE_GROUP_CONTAINER,
  BUTTON_TOGGLE_GROUP_HELP,
  BUTTON_TOGGLE_GROUP_HELP_ICON,
} from "./locators";

// component preview locators
export const labelPreviewByText = () =>
  cy
    .get(BUTTON_TOGGLE_GROUP_CONTAINER)
    .find('div[data-component="button-toggle"]')
    .find("label");
export const buttonToggleGroup = () => cy.get(BUTTON_TOGGLE_GROUP_CONTAINER);
export const buttonToggleGroupHelp = () => cy.get(BUTTON_TOGGLE_GROUP_HELP);
export const buttonToggleGroupHelpIcon = () =>
  cy.get(BUTTON_TOGGLE_GROUP_HELP_ICON);