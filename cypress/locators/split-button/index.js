import { SPLIT_TOGGLE_BUTTON, ADDITIONAL_BUTTONS, SPLIT_MAIN_BUTTON } from './locators';

// component preview locators
export const splitToggleButton = () => cy.get(SPLIT_TOGGLE_BUTTON);
export const additionalButton = index => cy.get(ADDITIONAL_BUTTONS).children().eq(index);
export const splitMainButtonDataComponent = index => cy.get(SPLIT_MAIN_BUTTON).children().eq(index);

// component functions in IFrame
export const additionalButtonIFrame = index => cy.iFrame(ADDITIONAL_BUTTONS).children().eq(index);
export const splitMainButtonDataComponentIFrame = index => cy.iFrame(SPLIT_MAIN_BUTTON).children().eq(index);
