import {
  podComponent, podPreview, podContent,
  podTitle, podSubTitle, podDescription, podFooter, podEdit,
} from '../../locators/pod';
import { DEBUG_FLAG } from '..';

const POD_DIV_PROPERTY = 'carbon-pod';

Then('Pod children on preview is set to {string}', (text) => {
  podContent().should('have.text', text);
});

Then('Pod title on preview is set to {string}', (text) => {
  podTitle().should('have.text', text);
});

Then('Pod subtitle on preview is set to {string}', (text) => {
  podSubTitle().should('have.text', text);
});

Then('Pod description on preview is set to {string}', (text) => {
  podDescription().should('have.text', text);
});

Then('Pod footer on preview is set to {string}', (text) => {
  podFooter().should('have.text', text);
});

Then('Pod padding on preview is {string}', (paddingProperty) => {
  podContent().should('have.css', 'padding', paddingProperty);
});

Then('Pod on preview has background color {string}', (color) => {
  podComponent().children().should('have.css', 'background-color', color);
});

Then('Pod component has border', () => {
  podPreview().should('have.css', 'border-bottom-width', '1px')
    .and('have.css', 'border-top-width', '1px')
    .and('have.css', 'border-left-width', '1px')
    .and('have.css', 'border-right-width', '1px')
    .and('have.css', 'border-bottom-style', 'solid')
    .and('have.css', 'border-bottom-color', 'rgb(204, 214, 218)');
});

Then('Pod component has no border', () => {
  cy.wait(500, { log: DEBUG_FLAG });
  podPreview().should('have.css', 'border-bottom-width', '0px')
    .and('have.css', 'border-top-width', '0px')
    .and('have.css', 'border-left-width', '0px')
    .and('have.css', 'border-right-width', '0px')
    .and('have.css', 'border-bottom-style', 'none');
});

Then('Pod {string} on preview is {string}', (element, alignTitle) => {
  switch (element) {
    case 'title':
      podTitle().parent().should('have.css', 'text-align', alignTitle);
      break;
    case 'subtitle':
      podSubTitle().should('have.css', 'text-align', alignTitle);
      break;
    case 'footer':
      podFooter().should('have.css', 'text-align', alignTitle);
      break;
    default: throw new Error('Only title, subtitle or footer can changed alignment');
  }
});

Then('Edit property is visible', () => {
  podEdit().should('be.visible');
});

Then('Pod component has {string} background color', (color) => {
  podPreview().should('have.css', 'background-color', color);
  podEdit().should('have.css', 'background-color', color)
    .and('be.visible');
});

Then('Pod component has no onEdit property', () => {
  podEdit().should('not.exist');
});

Then('I click onEdit icon', () => {
  podEdit().first().click();
});

Then('Pod component has width {string}', (width) => {
  podComponent().children().should('have.css', 'width', width);
});

Then('Pod component has displayEditButtonOnHover property', () => {
  podComponent().should('have.class', `${POD_DIV_PROPERTY}--content-triggers-edit`)
    .and('have.class', `${POD_DIV_PROPERTY}--is-hovered`);
  podEdit().should('be.visible');
});

Then('Pod component has triggerEditOnContent property', () => {
  podPreview().should('have.css', 'cursor', 'pointer');
});

Then('Pod component has internalEditButton property', () => {
  podEdit().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background-position-x', '0%')
    .and('have.css', 'background-position-y', '0%');
});

When('I hover mouse onto Pod content', () => {
  podTitle().trigger('mouseover');
});
