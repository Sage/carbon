import {
  TEXTAREA,
  CHARACTER_LIMIT,
  VISUALLY_HIDDEN_CHARACTER_COUNT,
  VISUALLY_HIDDEN_HINT,
} from "./locators";

// component preview locators
export const textarea = () => cy.get(TEXTAREA);
export const textareaChildren = () => cy.get(TEXTAREA).find("textarea");
export const characterLimitDefaultTextarea = () => cy.get(CHARACTER_LIMIT);
export const visuallyHiddenCharacterCount = () =>
  cy.get(VISUALLY_HIDDEN_CHARACTER_COUNT);
export const visuallyHiddenHint = () => cy.get(VISUALLY_HIDDEN_HINT);
