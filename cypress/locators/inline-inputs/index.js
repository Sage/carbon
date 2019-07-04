import { INLINE_INPUT } from './locators';

// component preview locators
export const inlineInput = index => cy.iFrame(INLINE_INPUT)
  .find(`div:nth-child(${index})`)
  .find('div > div')
  .find('input');
