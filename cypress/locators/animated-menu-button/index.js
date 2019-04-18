import { FORM } from '../locators';
import { ANIMATED_MENU_BUTTON_LABEL_PREVIEW, ANIMATED_MENU_BUTTON_PREVIEW } from './locators';

// knobs locators
export const animatedMenuButtonDirectionSelect = () => cy.get(FORM).contains('direction').find('select');

// component preview locators
export const animatedMenuButtonPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_PREVIEW);
export const animatedMenuButtonLabelPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_LABEL_PREVIEW);
