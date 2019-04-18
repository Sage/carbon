import {
  INPUT_WIDTH_INPUT, LABEL_WIDTH_INPUT, BUTTON_TOGGLE_GROUP_PREVIEW,
  LABEL_HELP_PREVIEW, INPUT_WIDTH_PREVIEW,
} from './locators';

// knobs locators
export const inputWidthInput = () => cy.get(INPUT_WIDTH_INPUT);
export const labelWidthInput = () => cy.get(LABEL_WIDTH_INPUT);

// component preview locators
export const buttonToggleGroupPreview = () => cy.iFrame(BUTTON_TOGGLE_GROUP_PREVIEW);
export const labelHelpPreview = () => cy.iFrame(LABEL_HELP_PREVIEW);
export const inputWidthPreview = () => cy.iFrame(INPUT_WIDTH_PREVIEW);
