import {
  TEXTAREA, COLS_SLIDER, ROWS_SLIDER, CHARACTER_LIMIT, TEXTAREA_INPUT,
} from './locators';

// Knobs locators
export const colsSlider = () => cy.get(COLS_SLIDER);
export const rowsSlider = () => cy.get(ROWS_SLIDER);

// component preview locators
export const textarea = () => cy.iFrame(TEXTAREA);
export const textareaChildren = () => cy.iFrame(TEXTAREA)
  .find('textarea');
export const characterLimit = () => cy.iFrame(CHARACTER_LIMIT)
  .find('span:nth-child(2)');
export const textareaInput = () => cy.iFrame(TEXTAREA_INPUT);
