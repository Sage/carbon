import { INLINE_INPUT } from './locators';

// component preview locators
export const inlineInput = index => cy.get(INLINE_INPUT)
  .find(`div:nth-child(${index})`)
  .find('input');
