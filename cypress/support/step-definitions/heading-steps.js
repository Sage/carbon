import {
  headingPreview, subheaderPreview, separatorPreview,
} from '../../locators/heading';
import { helpIcon, link, getDataElementByValue } from '../../locators';

const DIVIDER = 'carbon-heading--has-divider';

Then('heading children on preview is {word}', (children) => {
  headingPreview().invoke('text').should('contain', children);
});

Then('heading title is set to {word}', (title) => {
  getDataElementByValue('title').should('have.text', title);
});

Then('subheader on preview is {word}', (subheader) => {
  subheaderPreview().should('have.text', subheader);
});

Then('link on preview is {word}', (helpLink) => {
  helpIcon().should('have.attr', 'href', helpLink);
});

Then('backLink on preview is {word}', (backLink) => {
  link().children().should('have.attr', 'href', backLink);
});

Then('Heading divider is visible', () => {
  headingPreview().should('have.class', DIVIDER);
});

Then('divider is not visible', () => {
  headingPreview().should('not.have.class', DIVIDER);
});

Then('separator is visible', () => {
  separatorPreview().should('be.visible');
});

Then('separator is not visible', () => {
  separatorPreview().should('not.exist');
});
