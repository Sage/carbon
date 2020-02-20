import { LOADER, LOADER_INSIDE_BUTTON } from './locators';

export const loader = () => cy.iFrame(LOADER);
export const loaderInsideButton = () => cy.iFrame(LOADER_INSIDE_BUTTON);
