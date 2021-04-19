import {
  POPOVER_CONTAINER_DATA_COMPONENT,
  POPOVER_CONTAINER_CONTENT,
  POPOVER_CONTAINER_TITLE,
  POPOVER_CONTENT_CLOSE_ICON,
} from "./locators";

// component preview locators
export const popoverContainerContent = () => cy.get(POPOVER_CONTAINER_CONTENT);
export const popoverCloseIcon = () => cy.get(POPOVER_CONTENT_CLOSE_ICON);
export const popoverContainerTitle = () => cy.get(POPOVER_CONTAINER_TITLE);
export const popoverContainerContentSecondInnerElement = () =>
  popoverContainerContent().children().find("button");
export const popoverSettingsIconNoIFrame = () =>
  cy.get(POPOVER_CONTAINER_DATA_COMPONENT);
