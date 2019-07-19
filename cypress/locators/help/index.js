import { TOOLTIP_PREVIEW, TOOLTIP_POINTER, HELP_ICON_PREVIEW } from './locators';

// component preview locators
export const tooltipPreview = () => cy.iFrame(TOOLTIP_PREVIEW);
export const tooltipPointer = () => cy.iFrame(TOOLTIP_POINTER);
export const helpHref = () => cy.iFrame(HELP_ICON_PREVIEW);
