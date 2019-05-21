import { linkPreview, linkChildren, linkIcon } from '../../locators/link';

const LINK_ICON_ALIGN = 'carbon-link__icon--align-';

Then('children on preview is {string}', (children) => {
  linkChildren().should('have.text', children);
});

Then('Link is disabled', () => {
  linkPreview().should('have.attr', 'disabled');
});

Then('Link is enabled', () => {
  linkPreview().should('not.have.attr', 'disabled');
});

Then('Link on preview href is set to {string}', (href) => {
  linkPreview()
    .children()
    .should('have.attr', 'href', `${href}`);
});

Then('icon on link componenent preview is {string}', (iconName) => {
  linkIcon()
    .should('have.attr', 'data-element', iconName);
});

Then('icon align is set to {string}', (iconAlign) => {
  linkIcon()
    .should('have.class', `${LINK_ICON_ALIGN}${iconAlign}`);
});

Then('Link is tabbable', () => {
  linkPreview()
    .children()
    .should('have.attr', 'tabindex', '0');
});

Then('Link is not tabbable', () => {
  linkPreview()
    .children()
    .should('have.attr', 'tabindex', '-1');
});

Then('Link component is focused', () => {
  cy.focused().should('have', linkPreview());
});

Then('Link component is not focused', () => {
  cy.focused().should('not.have', linkPreview());
});
