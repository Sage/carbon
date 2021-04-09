import {
  ACCORDION_PREVIEW,
  ACCORDION_TITLE_CONTAINER,
  ACCORDION_ICON,
} from "./locators";

// component preview locators
export const accordionIframe = () => cy.iFrame(ACCORDION_PREVIEW);
export const accordionTitleContainerInIframe = () =>
  accordionIframe().find(ACCORDION_TITLE_CONTAINER);
export const accordionIcon = () =>
  accordionTitleContainerInIframe().find(ACCORDION_ICON);
export const accordionTitleContainerByPositionInIfame = (index) =>
  accordionIframe().find(ACCORDION_TITLE_CONTAINER).eq(index).children();

// NoIFrame locators
export const accordionTitleContainer = () =>
  cy.get(ACCORDION_PREVIEW).find(ACCORDION_TITLE_CONTAINER);
export const accordionDefaultTitle = () => cy.get(ACCORDION_TITLE_CONTAINER);
export const accordionTitleContainerByPosition = (index) =>
  cy
    .get(ACCORDION_PREVIEW)
    .find(ACCORDION_TITLE_CONTAINER)
    .eq(index)
    .children();
