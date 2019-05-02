import { FORM } from '../locators';
import { BUTTON_SUBTEXT_PREVIEW } from './locators';

// knobs locators
export const themeSelect = () => cy.get(FORM).contains('theme').find('select');

// component preview locators
export const buttonSubtextPreview = () => cy.iFrame(BUTTON_SUBTEXT_PREVIEW);
