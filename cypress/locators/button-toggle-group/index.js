import {
  LABEL_WIDTH_INPUT, BUTTON_TOGGLE_GROUP_PREVIEW,
} from './locators';

// knobs locators
export const labelWidthInput = () => cy.get(LABEL_WIDTH_INPUT);

// component preview locators
export const buttonToggleGroupPreview = () => cy.iFrame(BUTTON_TOGGLE_GROUP_PREVIEW);
