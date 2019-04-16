import { FORM } from './common-locators';

export const disabledCheckbox = () => cy.get(FORM).contains('disabled').find('input');
export const themeSelect = () => cy.get(FORM).contains('theme').find('select');

// component preview locators
const BUTTON_SUBTEXT_PREVIEW = '.carbon-button__subtext';
export const buttonSubtextPreview = () => cy.iFrame(BUTTON_SUBTEXT_PREVIEW);
