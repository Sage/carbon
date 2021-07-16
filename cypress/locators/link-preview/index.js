import { DLS_ROOT } from "../locators";
import { PILL_CLOSE_ICON } from "../pill/locators";

// component preview locators
export const linkPreviewText = () => cy.get(DLS_ROOT).find("a");
export const linkPreviewCloseIcon = () => cy.get(PILL_CLOSE_ICON);
export const linkPreviewCloseIconIframe = () => cy.iFrame(PILL_CLOSE_ICON);
