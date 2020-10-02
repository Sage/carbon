import { LINK_PREVIEW } from './locators';

// component preview locators
export const linkPreview = () => cy.get(LINK_PREVIEW);
export const linkChildren = () => cy.get(LINK_PREVIEW)
  .then($element => $element.children())
  .find('span[class="carbon-link__content"]');
export const linkIcon = () => cy.get(LINK_PREVIEW).children()
  .find('[data-component="icon"]');
