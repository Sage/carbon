import {
  POPOVER_CONTAINER_DATA_COMPONENT,
  POPOVER_CONTAINER_CONTENT,
  POPOVER_CONTAINER_TITLE,
  POPOVER_SETTINGS_ICON,
  POPOVER_CLOSE_ICON,
} from './locators';

// component preview locators
export const popoverContainerDataComponent = () => cy.iFrame(POPOVER_CONTAINER_DATA_COMPONENT);
export const popoverContainerContent = () => cy.iFrame(POPOVER_CONTAINER_CONTENT);
export const popoverContainerTitle = () => cy.iFrame(POPOVER_CONTAINER_TITLE);
export const popoverContainerContentFirstInnerElement = () => popoverContainerContent().children()
  .find('div');
export const popoverContainerContentSecondInnerElement = () => popoverContainerContent().children()
  .find('button');
export const popoverSettingsIcon = () => cy.iFrame(POPOVER_SETTINGS_ICON);
export const popoverCloseIcon = () => cy.iFrame(POPOVER_CLOSE_ICON);
