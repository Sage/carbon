import {
  SLIDE_INDEX_SELECT, ENABLE_SLIDE_SELECTOR_CHECKBOX, ENABLE_PREVIOUS_BUTTON_CHECKBOX,
  ENABLE_NEXT_BUTTON_CHECKBOX, TRANSITION_SELECT, SLIDE, CAROUSEL, PREVIOUS_ARROW_BUTTON,
  NEXT_ARROW_BUTTON, CAROUSEL_SLIDE_SELECTOR,
} from './locators';

// knobs locators
export const slideIndexSelect = () => cy.get(SLIDE_INDEX_SELECT);
export const enableSlideSelectorCheckbox = () => cy.get(ENABLE_SLIDE_SELECTOR_CHECKBOX);
export const enablePreviousButtonCheckbox = () => cy.get(ENABLE_PREVIOUS_BUTTON_CHECKBOX);
export const enableNextButtonCheckbox = () => cy.get(ENABLE_NEXT_BUTTON_CHECKBOX);
export const transitionSelect = () => cy.get(TRANSITION_SELECT);

// component preview locators
export const slide = () => cy.iFrame(SLIDE);
export const carousel = () => cy.iFrame(CAROUSEL).find('div');
export const previousArrowButton = () => cy.iFrame(PREVIOUS_ARROW_BUTTON);
export const nextArrowButton = () => cy.iFrame(NEXT_ARROW_BUTTON);
export const slideSelector = () => cy.iFrame(CAROUSEL_SLIDE_SELECTOR);
export const slideSelectorIndex = index => slideSelector().children(`:nth-child(${index + 1})`); // +1 because nodes are indexed from 1
export const giveTransition = (transition, direction) => {
  let directionString = '';
  let prefix = 'carousel-transition-';
  if (transition === 'slide') {
    directionString = direction === 'right' ? '-next' : '-previous';
    prefix = '';
  }
  return cy.iFrame(`.${prefix}${transition}${directionString}-enter-active`);
};
