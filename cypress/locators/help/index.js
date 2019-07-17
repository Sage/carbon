import { TOOLTIP_PREVIEW, TOOLTIP_POINTER } from './locators';

// component preview locators
export const tooltipPreview = () => cy.iFrame(TOOLTIP_PREVIEW);
export const tooltipPointer = () => cy.iFrame(TOOLTIP_POINTER);
