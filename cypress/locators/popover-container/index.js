import {
  POPOVER_CONTAINER_DATA_COMPONENT,
  POPOVER_CONTAINER_CONTENT,
  POPOVER_CONTAINER_TITLE,
  POPOVER_SETTINGS_ICON,
  POPOVER_CONTAINER_BASIC_ID,
  POPOVER_CONTAINER_RIGHT_ALIGNED_ID,
  POPOVER_CONTENT_COVER_BUTTON_ID,
  POPOVER_CONTENT_CLOSE_ICON,
} from './locators';

// DS locators
export const popoverSettingsIconBasic = () => cy.iFrame(POPOVER_CONTAINER_BASIC_ID)
  .find(POPOVER_CONTAINER_DATA_COMPONENT);
export const popoverSettingsIconRightAligned = () => cy.iFrame(POPOVER_CONTAINER_RIGHT_ALIGNED_ID)
  .find(POPOVER_CONTAINER_DATA_COMPONENT);
export const popoverSettingsIconCover = () => cy.iFrame(POPOVER_CONTENT_COVER_BUTTON_ID)
  .find(POPOVER_SETTINGS_ICON);
export const popoverContainerContent = () => cy.iFrame(POPOVER_CONTAINER_CONTENT);
export const popoverCloseIcon = () => cy.iFrame(POPOVER_CONTENT_CLOSE_ICON);

// component preview locators
export const popoverContainerTitle = () => cy.iFrame(POPOVER_CONTAINER_TITLE);
export const popoverContainerContentSecondInnerElement = () => popoverContainerContent().children()
  .find('button');
export const popoverContainerDataComponent = () => cy.iFrame(POPOVER_CONTAINER_DATA_COMPONENT);
