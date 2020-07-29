import {
  TEXTAREA, COLS_SLIDER, ROWS_SLIDER, CHARACTER_LIMIT, TEXTAREA_INPUT,
} from './locators';

// Knobs locators
export const colsSlider = () => cy.get(COLS_SLIDER);
export const rowsSlider = () => cy.get(ROWS_SLIDER);

// component preview locators
export const textarea = () => cy.get(TEXTAREA);
export const textareaChildren = () => cy.get(TEXTAREA)
  .find('textarea');
export const characterLimit = () => cy.get(CHARACTER_LIMIT)
  .find('span:nth-child(2)');
export const characterLimitDefaultTextarea = () => cy.get(CHARACTER_LIMIT);
export const textareaInput = () => cy.get(TEXTAREA_INPUT);
