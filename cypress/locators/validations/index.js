import { DEPRECATED_ERROR_MESSAGE, DEPRECATED_INPUT_VALIDATION } from './locators';

export const errorMessageNoIframe = () => cy.get(DEPRECATED_ERROR_MESSAGE);
export const inputValidationNoIframe = () => cy.get(DEPRECATED_INPUT_VALIDATION);
