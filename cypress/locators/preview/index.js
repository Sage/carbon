import PREVIEW_COMPONENT from "./locators";
import { cyRoot } from "../index";
// component preview locators
export const previewComponent = () => cy.get(PREVIEW_COMPONENT);
export const lineComponent = () =>
  cyRoot().find("div").find("div").find('span[data-component="preview"]');
