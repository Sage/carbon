import { SWITCH_PREVIEW, SWITCH_INPUT } from './locators';

// component preview locators
export const switchPreview = () => cy.iFrame(SWITCH_PREVIEW);
export const switchProperties = () => cy.iFrame(SWITCH_PREVIEW)
  .find('span');
export const switchInput = () => cy.iFrame(SWITCH_INPUT);
