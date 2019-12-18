import { TILE, PIXEL_WIDTH_SLIDER, WIDTH_SLIDER } from './locators';

// component knob locators
export const pixelWidthSlider = () => cy.get(PIXEL_WIDTH_SLIDER);
export const widthSlider = () => cy.get(WIDTH_SLIDER);

// component preview locators
export const tile = () => cy.iFrame(TILE);
