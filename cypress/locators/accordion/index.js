import {
  ACCORDION_PREVIEW,
  ACCORDION_TITLE_CONTAINER,
  ACCORDION_ICON,
  ACCORDION_DEFAULT_ID,
} from './locators';

// component preview locators
export const accordionIframe = () => cy.iFrame(ACCORDION_PREVIEW);
export const accordionTitleContainerInIframe = () => accordionIframe().find(ACCORDION_TITLE_CONTAINER);
export const accordionIcon = () => accordionTitleContainer()
  .find(ACCORDION_ICON);
export const accordionTitleContainerByPositionInIfame = index => accordionIframe()
  .find(ACCORDION_TITLE_CONTAINER).eq(index).children();

// DS locators
export const accordionDefaultTitleDS = () => cy.iFrame(ACCORDION_DEFAULT_ID)
  .find(ACCORDION_TITLE_CONTAINER);

// NoIFrame locators
export const accordionTitleContainer = () => cy.get(ACCORDION_PREVIEW)
  .find(ACCORDION_TITLE_CONTAINER);
export const accordionDefaultTitle = () => cy.get(ACCORDION_TITLE_CONTAINER);
export const accordionTitleContainerByPosition = index => cy.get(ACCORDION_PREVIEW)
  .find(ACCORDION_TITLE_CONTAINER).eq(index).children();
