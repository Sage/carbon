import { LINK_PREVIEW } from './locators';

// component preview locators
export const linkPreview = () => cy.iFrame(LINK_PREVIEW);
export const linkFirstSpan = () => linkPreview().find('span>span').first();
export const linkChildren = () => cy.iFrame(LINK_PREVIEW)
  .then($element => $element.children())
  .find('span[class="carbon-link__content"]');
export const linkIcon = () => cy.iFrame(LINK_PREVIEW).children()
  .find('[data-component="icon"]');
