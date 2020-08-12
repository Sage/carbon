import {
  SLIDE,
  PREVIOUS_ARROW_BUTTON,
  NEXT_ARROW_BUTTON,
  CAROUSEL_SLIDE_SELECTOR,
} from './locators';

// component preview locators
export const slide = index => cy.get(SLIDE).eq(index);
export const previousArrowButton = () => cy.get(PREVIOUS_ARROW_BUTTON);
export const nextArrowButton = () => cy.get(NEXT_ARROW_BUTTON);
export const slideSelector = () => cy.get(CAROUSEL_SLIDE_SELECTOR);
export const giveTransition = (transition, direction) => {
  let directionString = '';
  let prefix = 'carousel-transition-';
  if (transition === 'slide') {
    directionString = direction === 'right' ? '-next' : '-previous';
    prefix = '';
  }
  return cy.get(`.${prefix}${transition}${directionString}-enter-active`);
};

export const slideIFrame = index => cy.iFrame(SLIDE).eq(index);
