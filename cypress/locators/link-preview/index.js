import { CY_ROOT } from "../locators";
import { PILL_CLOSE_ICON } from "../pill/locators";

// component preview locators
export const linkPreview = () => cy.get(CY_ROOT).find("a");
export const linkPreviewAs = (as) => cy.get(CY_ROOT).find(as);
export const linkPreviewCloseIcon = () => cy.get(PILL_CLOSE_ICON);
export const linkPreviewTextElement = (index) =>
  linkPreview().children().eq(1).children().find("div").eq(index);
