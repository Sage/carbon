import {
  TEXTAREA, CHARACTER_LIMIT,
} from './locators';

// component preview locators
export const textarea = () => cy.get(TEXTAREA);
export const textareaChildren = () => cy.get(TEXTAREA)
  .find('textarea');
export const characterLimitDefaultTextarea = () => cy.get(CHARACTER_LIMIT);
