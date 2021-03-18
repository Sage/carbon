import { LINK_PREVIEW, SKIP_LINK } from "./locators";

// component preview locators
export const linkPreview = () => cy.get(LINK_PREVIEW);
export const linkChildren = () =>
  cy
    .get(LINK_PREVIEW)
    .then(($element) => $element.children())
    .find('span[class="carbon-link__content"]');
export const linkIcon = () =>
  cy.get(LINK_PREVIEW).children().find('[data-component="icon"]');
export const skipLink = () => cy.get(SKIP_LINK).find("a");
export const relLink = () => linkPreview().find("a");
