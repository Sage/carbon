import {
  TRANSITION_SELECT, CLASSIC_SLIDE, SLIDE,
  PREVIOUS_ARROW_BUTTON, NEXT_ARROW_BUTTON, CAROUSEL_SLIDE_SELECTOR,
} from './locators';

// knobs locators
export const transitionSelect = () => cy.get(TRANSITION_SELECT);

// component preview locators
export const classicSlide = () => cy.iFrame(CLASSIC_SLIDE);
export const slide = index => cy.iFrame(SLIDE).eq(index);
export const previousArrowButton = () => cy.iFrame(PREVIOUS_ARROW_BUTTON);
export const nextArrowButton = () => cy.iFrame(NEXT_ARROW_BUTTON);
export const slideSelector = () => cy.iFrame(CAROUSEL_SLIDE_SELECTOR);
export const giveTransition = (transition, direction) => {
  let directionString = '';
  let prefix = 'carousel-transition-';
  if (transition === 'slide') {
    directionString = direction === 'right' ? '-next' : '-previous';
    prefix = '';
  }
  return cy.iFrame(`.${prefix}${transition}${directionString}-enter-active`);
};
