import {
  accordionTitleContainer, accordionIcon, accordion, accordionTitleContainerByPosition,
  accordionTitleContainerNoIFrame, accordionTitleContainerByPositionNoIFrame,
} from '../../locators/accordion';
import { positionOfElement, keyCode } from '../helper';

Then('Accordion iconAlign property on preview is set to {string}', (iconAlign) => {
  accordionTitleContainerByPosition(positionOfElement('first')).first()
    .should('have.attr', 'data-element', 'accordion-title')
    .and('be.visible');
  accordionTitleContainerByPosition(positionOfElement('first')).last()
    .should('have.attr', 'data-component', 'icon')
    .and('be.visible');
  if (iconAlign === 'right') { // set by default
    accordionTitleContainer().should('have.css', 'justify-content', 'space-between')
      .and('not.have.css', 'flex-direction', 'row-reverse');
    accordionTitleContainerByPosition(positionOfElement('first')).first()
      .should('have.css', 'margin-right', '0px');
  } else {
    accordionTitleContainer().should('have.css', 'flex-direction', 'row-reverse');
    accordionTitleContainerByPosition(positionOfElement('first')).last()
      .should('have.css', 'margin-right', '16px');
  }
});

Then('Accordion row is {string} then iconType property on preview is set to {string}', (state, iconType) => {
  if (state === 'closed') {
    accordionIcon().should('have.attr', 'data-element', iconType)
      .and('be.visible')
      .and('have.css', 'transform', 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)');
  } else {
    accordionIcon().should('have.attr', 'data-element', iconType)
      .and('be.visible')
      .and('not.have.css', 'transform', 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)');
  }
});

Then('Accordion type property on preview is set to {string}', (type) => {
  if (type === 'primary') {
    accordion().should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border', '1px solid rgb(204, 214, 218)');
  } else {
    accordion().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
      .and('not.have.css', 'border', '1px solid rgb(204, 214, 218)');
  }
});

When('I expand accordionRow via click', () => {
  accordionTitleContainer().click();
});

When('I expand accordionRow using {string} key', (key) => {
  accordionTitleContainer().trigger('keydown', keyCode(key));
});

Then('accordionRow is expanded', () => {
  accordionTitleContainer().should('have.attr', 'aria-expanded', 'true')
    .and('be.visible');
});

Then('Accordion has proper {word} type color {string} palette', (type, color) => {
  const borderColor = 'rgb(204, 214, 218)';
  const borderWidth = '1px';
  const borderStyle = 'solid';
  accordion().should('have.css', 'border-bottom-color', color)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor)
    .and('have.css', 'border-bottom-style', borderStyle)
    .and('have.css', 'border-left-style', borderStyle)
    .and('have.css', 'border-right-style', borderStyle)
    .and('have.css', 'border-top-style', borderStyle)
    .and('have.css', 'border-bottom-width', borderWidth)
    .and('have.css', 'border-left-width', borderWidth)
    .and('have.css', 'border-right-width', borderWidth)
    .and('have.css', 'border-top-width', borderWidth);
});

Then('accordionRow has golden border outline', () => {
  accordionTitleContainer().should('have.css', 'outline', 'rgb(255, 181, 0) solid 2px')
    .and('be.visible');
});

When('I focus accordionRow', () => {
  accordionTitleContainer(positionOfElement('first')).focus();
});

Then('Accordion {int} row is focused', (index) => {
  accordionTitleContainerByPositionNoIFrame(index).parent().should('have.css', 'outline', 'rgb(255, 181, 0) solid 2px')
    .and('be.visible');
});

When('I focus {word} accordionRow', (position) => {
  accordionTitleContainerNoIFrame(positionOfElement(position)).first().focus({ force: true });
});

Then('Accordion inner element is focused', () => {
  cy.focused().should('have.attr', 'data-element', 'input');
});
