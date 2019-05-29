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
  if (text === '0') {
    preview().should('have.attr', 'style', `${parameter}: ${text}px;`);
  } else {
    preview().should('not.have.attr', 'style');
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
