import { FORM, STORY_ROOT } from './common-locators';

// knobs locators
export const buttonIconSelect = () => cy.get(FORM).contains('buttonIcon').find('select');
export const buttonIconSizeSelect = () => cy.get(FORM).contains('buttonIconSize').find('select');
export const buttonToggleGroupedCheckbox = () => cy.get(FORM).contains('grouped').find('input');

// component preview locators
const BUTTON_TOGGLE_PREVIEW = '.carbon-button-toggle';
const ICON_PREVIEW = '.carbon-button-toggle__button-icon';
const ICON_NAME_PREVIEW = '.carbon-icon';
export const buttonTogglePreview = () => cy.iFrame(BUTTON_TOGGLE_PREVIEW);
export const buttonToggleIconPreview = () => cy.iFrame(ICON_PREVIEW);
export const buttonToggleIconNamePreview = () => cy.iFrame(ICON_NAME_PREVIEW);
export const buttonToggleLabelPreview = () => cy.iFrame(STORY_ROOT).find('label').first();
