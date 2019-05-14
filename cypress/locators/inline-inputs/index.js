import { INLINE_INPUTS } from './locators';

// component preview locators
export const inlineInputs = index => cy.iFrame(INLINE_INPUTS)
  .eq(`${index}`);
