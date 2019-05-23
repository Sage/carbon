import { BUTTON_TOGGLE_PREVIEW } from './locators';
import { STORY_ROOT } from '../locators';

// component preview locators
export const buttonTogglePreview = () => cy.iFrame(BUTTON_TOGGLE_PREVIEW);
export const buttonToggleLabelPreview = () => cy.iFrame(STORY_ROOT).find('label').first();
