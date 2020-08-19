import { TOOLTIP_PREVIEW, TOOLTIP_POINTER, HELP_ICON_PREVIEW } from './locators';

// component preview locators
export const tooltipPreview = () => cy.get(TOOLTIP_PREVIEW);
export const tooltipPointer = () => cy.get(TOOLTIP_POINTER);
export const helpHref = () => cy.get(HELP_ICON_PREVIEW);
