import {
  linkPreview, linkChildren, linkIcon, linkFirstSpan,
} from '../../locators/link';

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
  linkPreview().should('have.attr', 'href', `${href}`);
});

Then('icon on link componenent preview is {string}', (iconName) => {
  linkIcon().should('have.attr', 'data-element', iconName);
});

Then('icon align is set to left', () => {
  linkFirstSpan().should('have.attr', 'data-component', 'icon');
});

Then('icon align is set to right', () => {
  linkFirstSpan().should('have.class', 'carbon-link__content').and('have.text', 'Link');
});

Then('Link is tabbable', () => {
  linkPreview().should('have.attr', 'tabindex', '0');
});

Then('Link is not tabbable', () => {
  linkPreview().should('have.attr', 'tabindex', '-1');
});

Then('Link component is focused', () => {
  cy.focused().should('have', linkPreview());
});

Then('Link component is not focused', () => {
  cy.focused().should('not.have', linkPreview());
});
