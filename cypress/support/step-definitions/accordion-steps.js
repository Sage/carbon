import {
  accordionTitleContainer,
  accordionIcon,
  accordionTitleContainerByPosition,
  accordionTitleContainerNoIFrame,
  accordionTitleContainerByPositionNoIFrame,
  accordionDefaultTitleDS,
  accordionDefaultTitleNoIFrame,
} from '../../locators/accordion';
import { positionOfElement, keyCode } from '../helper';

Then('Accordion iconAlign property on preview is set to {string}', (iconAlign) => {
  accordionTitleContainerByPosition(positionOfElement('first')).first()
    .should('have.attr', 'data-element', 'accordion-headings-container')
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

When('I expand Design System accordionRow via click', () => {
  accordionDefaultTitleDS().click();
});

When('I expand Design System accordionRow via click in NoIFrame', () => {
  accordionDefaultTitleNoIFrame().click();
});

When('I expand accordionRow via click', () => {
  accordionTitleContainer().click();
});

When('I expand accordionRow using {string} key', (key) => {
  accordionDefaultTitleDS().trigger('keydown', keyCode(key));
});

Then('accordionRow is expanded', () => {
  accordionTitleContainer().should('have.attr', 'aria-expanded', 'true')
    .and('be.visible');
});

Then('accordionRow has golden border outline', () => {
  accordionDefaultTitleDS().should('have.css', 'outline', 'rgb(255, 181, 0) solid 2px')
    .and('be.visible');
});

When('I focus accordionRow', () => {
  accordionDefaultTitleDS().focus();
});

Then('Accordion {int} row is focused', (index) => {
  accordionTitleContainerByPositionNoIFrame(index).parent().should('have.css', 'outline', 'rgb(255, 181, 0) solid 2px')
    .and('be.visible');
});

When('I focus {word} accordionRow', (position) => {
  accordionTitleContainerNoIFrame(positionOfElement(position)).first().focus({ force: true });
});
