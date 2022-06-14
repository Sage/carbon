import {
  INLINE_INPUT_CONTAINER,
  INLINE_INPUTS_PREVIEW,
  INLINE_LABEL,
  INLINE_CHILDREN,
} from "./locators";

// component preview locators

export const inlineInputContainer = () => cy.get(INLINE_INPUT_CONTAINER);

export const inlineInputsPreview = () => cy.get(INLINE_INPUTS_PREVIEW);

export const inlineLabel = () => cy.get(INLINE_LABEL);

export const inlinelabelWidth = () =>
  cy.get(INLINE_INPUTS_PREVIEW).find("div").eq(0);

export const inlineChildren = () => cy.get(INLINE_CHILDREN);
