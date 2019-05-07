import { BUTTON_TOGGLE_PREVIEW, ICON_PREVIEW, ICON_NAME_PREVIEW } from './locators';
import { FORM, STORY_ROOT } from '../locators';

// knobs locators
export const buttonIconSelect = () => cy.get(FORM).contains('buttonIcon').find('select');
export const buttonIconSizeSelect = () => cy.get(FORM).contains('buttonIconSize').find('select');

// component preview locators
export const buttonTogglePreview = () => cy.iFrame(BUTTON_TOGGLE_PREVIEW);
export const buttonToggleIconPreview = () => cy.iFrame(ICON_PREVIEW);
export const buttonToggleIconNamePreview = () => cy.iFrame(ICON_NAME_PREVIEW);
export const buttonToggleLabelPreview = () => cy.iFrame(STORY_ROOT).find('label').first();
