import { LABEL_INPUT_PREVIEW, INPUT_PRECISION_SLIDER, DECIMAL_PREVIEW } from './locators';

// knobs locators
// export const alignSelect = () => cy.get(ALIGN_SELECT);
export const inputPrecisionSlider = () => cy.get(INPUT_PRECISION_SLIDER);

// component preview locators
export const labelPreview = () => cy.iFrame(LABEL_INPUT_PREVIEW);
export const decimalPreview = () => cy.iFrame(DECIMAL_PREVIEW);
