import {
  ACCORDION_PREVIEW, ACCORDION_CONTENT, ACCORDION_TITLE_CONTAINER, ACCORDION_TITLE,
} from './locators';

// component preview locators
export const accordion = () => cy.iFrame(ACCORDION_PREVIEW);
export const accordionTitleContainer = () => accordion().find(ACCORDION_TITLE_CONTAINER);
export const accordionTitleContainerNoIFrame = () => cy.get(ACCORDION_PREVIEW)
  .find(ACCORDION_TITLE_CONTAINER);
export const accordionTitle = () => accordionTitleContainer().find(ACCORDION_TITLE);
export const accordionContent = () => accordion().find(ACCORDION_CONTENT);
export const accordionIcon = () => accordionTitleContainer()
  .find('span');
export const accordionTitleContainerByPosition = index => accordion()
  .find(ACCORDION_TITLE_CONTAINER).eq(index).children();
export const accordionTitleContainerByPositionNoIFrame = index => cy.get(ACCORDION_PREVIEW)
  .find(ACCORDION_TITLE_CONTAINER).eq(index).children();
