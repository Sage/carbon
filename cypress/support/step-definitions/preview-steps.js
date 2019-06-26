import { preview } from '../../locators/preview';
import { STORY_ROOT } from '../../locators/locators';

Then('Preview component is loading', () => {
  preview().should('be.visible');
});

Then('Preview component is not loading', () => {
  preview().should('not.exist');
});

Then('Preview children is set to {string}', (text) => {
  cy.iFrame(STORY_ROOT).should('have.text', text);
});

Then('Preview {word} is set to {string}', (parameter, text) => {
  preview().should('have.attr', 'style', `${parameter}: ${text};`);
});

Then('Preview {word} is not set to {string}', (parameter, text) => {
  if (parameter === 'lines') {
    cy.iFrame(STORY_ROOT).children().should('have.length', 0);
    preview().should('not.exist');
  // eslint-disable-next-line no-restricted-globals
  } else if (isNaN(parameter)) {
    preview().should('not.have.attr', 'style', `${parameter}${text}px`);
  }
});

Then('Preview has {string} lines', (value) => {
  if (value === '0') {
    cy.iFrame(STORY_ROOT).children().should('have.length', `${value}`);
    preview().should('not.exist');
  } else {
    cy.iFrame(STORY_ROOT).children().should('have.length', `${value}`);
    preview().should('be.visible');
  }
});
