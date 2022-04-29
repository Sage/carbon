import {
  SLIDE,
  PREVIOUS_ARROW_BUTTON,
  NEXT_ARROW_BUTTON,
  CAROUSEL,
  SLIDE_SELECTOR,
} from "./locators";

// component preview locators
export const slide = (index) => cy.get(SLIDE).eq(index);
export const previousArrowButton = () => cy.get(PREVIOUS_ARROW_BUTTON);
export const nextArrowButton = () => cy.get(NEXT_ARROW_BUTTON);
export const carousel = () => cy.get(CAROUSEL);
export const slideSelector = () => cy.get(CAROUSEL).find(SLIDE_SELECTOR);
