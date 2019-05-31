import { TITLE, RAINBOW, TSPAN } from './locators';

// component preview locators
export const titlePreview = () => cy.iFrame(TITLE);
export const nameAndLabelPreview = nameAndLabel => cy.iFrame(RAINBOW).contains(nameAndLabel);
export const firstBitPreview = () => cy.iFrame(RAINBOW).find('g > g > path').first();
export const tooltip = () => cy.iFrame(TSPAN);
