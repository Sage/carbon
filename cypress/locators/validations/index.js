import { DEPRECATED_ERROR_MESSAGE, DEPRECATED_INPUT_VALIDATION } from './locators';
import { COMMON_INPUT } from '../locators';

export const errorMessageNoIframe = () => cy.get(COMMON_INPUT + DEPRECATED_ERROR_MESSAGE);
export const inputValidationNoIframe = () => cy.get(COMMON_INPUT + DEPRECATED_INPUT_VALIDATION);
