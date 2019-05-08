import {
  childrenPreview, titlePreview, subheaderPreview, separatorPreview,
} from '../../locators/heading';
import { helpIcon, link } from '../../locators';

const DIVIDER = 'carbon-heading--has-divider';

Then('heading children on preview is {string}', (children) => {
  childrenPreview().should('contain', children);
});

Then('heading title is set to {string}', (title) => {
  titlePreview().should('have.text', title);
});

Then('subheader on preview is {string}', (subheader) => {
  subheaderPreview().should('have.text', subheader);
});

Then('helpLink on preview is {string}', (helpLink) => {
  helpIcon().should('have.attr', 'href', helpLink);
});

Then('backLink on preview is {string}', (backLink) => {
  link().should('have.attr', 'href', backLink);
});

Then('divider is visible', () => {
  separatorPreview().should('have.class', DIVIDER);
});

Then('divider is not visible', () => {
  separatorPreview().should('not.have.class', DIVIDER);
});

Then('separator is visible', () => {
  separatorPreview().should('be.visible');
});

Then('separator is not visible', () => {
  separatorPreview().should('not.be.visible');
});
