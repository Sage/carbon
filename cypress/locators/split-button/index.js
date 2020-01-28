import { SPLIT_TOGGLE_BUTTON, ADDITIONAL_BUTTONS, SPLIT_MAIN_BUTTON } from './locators';

// component preview locators
export const splitToggleButton = () => cy.iFrame(SPLIT_TOGGLE_BUTTON);
export const additionalButton = index => cy.iFrame(ADDITIONAL_BUTTONS).children().eq(index);
export const splitMainButton = index => cy.iFrame(SPLIT_MAIN_BUTTON)
  .find('button')
  .find(`span:nth-child(${index})`);
export const splitMainButtonDataComponent = index => cy.iFrame(SPLIT_MAIN_BUTTON)
  .find(`:nth-child(${index})`);
