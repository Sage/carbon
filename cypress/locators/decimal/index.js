import { INPUT_PRECISION_SLIDER, DECIMAL_PREVIEW } from './locators';

// knobs locators
export const inputPrecisionSlider = () => cy.get(INPUT_PRECISION_SLIDER);

// component preview locators
export const decimalPreview = () => cy.iFrame(DECIMAL_PREVIEW);
