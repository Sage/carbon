import { FORM } from '../locators';
import { ANIMATED_MENU_BUTTON_LABEL_PREVIEW, ANIMATED_MENU_BUTTON_PREVIEW, ANIMATED_MENU_BUTTON_LABEL } from './locators';

// knobs locators
export const animatedMenuButtonDirectionSelect = () => cy.get(FORM).contains('direction').find('select');

// component preview locators
export const animatedMenuButtonPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_PREVIEW);
export const animatedMenuButtonLabelPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_LABEL_PREVIEW);
export const animatedMenuButtonLabel = () => cy.iFrame(ANIMATED_MENU_BUTTON_LABEL);
