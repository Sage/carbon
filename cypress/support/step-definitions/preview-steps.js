import { preview } from '../../locators/preview';
import { STORY_ROOT } from '../../locators/locators';

Then('Preview component is loading', () => {
  preview().should('be.visible')
    .and('have.css', 'animation', 'shimmer 2s ease 0s infinite normal none running')
    .and('have.css', 'background', 'rgb(191, 204, 210) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'display', 'block')
    .and('have.css', 'height', '15px')
    .and('have.css', 'width', '981px');
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
