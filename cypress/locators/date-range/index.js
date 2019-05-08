import {
  LABEL_PREVIEW, ERROR_ICON, ERROR_MESSAGE,
} from './locators';

// component preview locators
export const labelPreview = index => cy.iFrame(LABEL_PREVIEW)
  .find(`:nth-child(${index})`).find('label[data-element="label"]');
export const dateInput = (index, label) => cy.iFrame(LABEL_PREVIEW)
  .find(`:nth-child(${index})`).find(`input[data-element="${label}-date"]`);
export const errorIcon = () => cy.iFrame(ERROR_ICON);
export const errorMessage = () => cy.iFrame(ERROR_MESSAGE);
