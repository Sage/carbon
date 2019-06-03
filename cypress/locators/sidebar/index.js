import { SIDEBAR_PREVIEW, SIDEBAR_HEADER } from './locators';

// component preview locators
export const sidebarPreview = () => cy.iFrame(SIDEBAR_PREVIEW);
export const sidebarHeader = () => cy.iFrame(SIDEBAR_HEADER);
