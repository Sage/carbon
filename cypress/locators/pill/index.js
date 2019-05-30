import { PILL_PREVIEW, PILL_CLOSE_ICON } from './locators';

// component preview locators
export const pillPreview = () => cy.iFrame(PILL_PREVIEW);
export const pillCloseIcon = () => cy.iFrame(PILL_CLOSE_ICON);
