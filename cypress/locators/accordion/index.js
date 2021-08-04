import {
  ACCORDION_PREVIEW,
  ACCORDION_TITLE_CONTAINER,
  ACCORDION_ICON,
} from "./locators";

// locators
export const accordionTitleContainer = () =>
  cy.get(ACCORDION_PREVIEW).find(ACCORDION_TITLE_CONTAINER);
export const accordionDefaultTitle = () => cy.get(ACCORDION_TITLE_CONTAINER);
export const accordionTitleContainerByPosition = (index) =>
  cy
    .get(ACCORDION_PREVIEW)
    .find(ACCORDION_TITLE_CONTAINER)
    .eq(index)
    .children();
export const accordionIcon = () =>
  accordionTitleContainer().find(ACCORDION_ICON);
