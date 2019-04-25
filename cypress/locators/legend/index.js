import { LEGEND_INPUT, LEGEND_PREVIEW } from './locators';

// knobs locators
export const legendInput = () => cy.get(LEGEND_INPUT);

// component preview locators
export const legendPreview = () => cy.iFrame(LEGEND_PREVIEW);
