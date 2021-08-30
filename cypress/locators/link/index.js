import { link } from "..";
import { SKIP_LINK } from "./locators";

// component preview locators
export const linkChildren = () =>
  link()
    .then(($element) => $element.children())
    .find("span");
export const linkIcon = () => link().children().find('[data-component="icon"]');
export const skipLink = () => cy.get(SKIP_LINK).find("a");
export const relLink = () => link().find("a");
