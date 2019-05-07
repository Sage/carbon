import {
  ALIGN_SELECT, LABEL_INPUT_PREVIEW, LABEL, INPUT_PRECISION_SLIDER,
} from './locators';

// knobs locators
export const alignSelect = () => cy.get(ALIGN_SELECT);
export const inputPrecisionSlider = () => cy.get(INPUT_PRECISION_SLIDER);

// component preview locators
export const labelPreview = () => cy.iFrame(LABEL_INPUT_PREVIEW);
export const label = () => cy.iFrame(LABEL);
