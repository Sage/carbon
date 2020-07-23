import {
  ACCORDION_PREVIEW,
  ACCORDION_CONTENT,
  ACCORDION_TITLE_CONTAINER,
  ACCORDION_TITLE,
  ACCORDION_ICON,
  ACCORDION_DEFAULT_ID,
} from './locators';

// component preview locators
export const accordion = () => cy.iFrame(ACCORDION_PREVIEW);
export const accordionTitleContainer = () => accordion().find(ACCORDION_TITLE_CONTAINER);
export const accordionTitleContainerNoIFrame = () => cy.get(ACCORDION_PREVIEW)
  .find(ACCORDION_TITLE_CONTAINER);
export const accordionTitle = () => accordionTitleContainer().find(ACCORDION_TITLE);
export const accordionContent = () => accordion().find(ACCORDION_CONTENT);
export const accordionIcon = () => accordionTitleContainer()
  .find(ACCORDION_ICON);
export const accordionTitleContainerByPosition = index => accordion()
  .find(ACCORDION_TITLE_CONTAINER).eq(index).children();
export const accordionTitleContainerByPositionNoIFrame = index => cy.get(ACCORDION_PREVIEW)
  .find(ACCORDION_TITLE_CONTAINER).eq(index).children();

// DS locators
export const accordionDefaultTitleDS = () => cy.iFrame(ACCORDION_DEFAULT_ID)
  .find(ACCORDION_TITLE_CONTAINER);

// NoIFrame locators
export const accordionDefaultTitleNoIFrame = () => cy.get(ACCORDION_TITLE_CONTAINER);
