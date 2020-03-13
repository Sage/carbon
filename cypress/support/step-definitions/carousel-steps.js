import {
  classicSlide, slide, nextArrowButton, previousArrowButton,
  slideSelector, transitionSelect, giveTransition,
} from '../../locators/carousel';
import { DEBUG_FLAG } from '..';

function clickCarouselButton(direction) {
  switch (direction) {
    case 'left':
      cy.wait(1500, { log: DEBUG_FLAG }); // required because of component refresh
      previousArrowButton().click();
      break;
    case 'right':
      cy.wait(1500, { log: DEBUG_FLAG }); // required because of component refresh
      nextArrowButton().click();
      break;
    default: throw new Error('Direction can be only left or right');
  }
}

Then('classic slide title is {string}', (title) => {
  cy.wait(1500, { log: DEBUG_FLAG }); // required because of component refresh
  classicSlide().should('have.text', title);
});

Then('slide {int} title is {string}', (index, title) => {
  cy.wait(1500, { log: DEBUG_FLAG }); // required because of component refresh
  slide(index).should('have.text', title);
});

Then('I move carousel {string}', (direction) => {
  clickCarouselButton(direction);
});

Then('I click carousel {string} button', (direction) => {
  clickCarouselButton(direction);
});

Then('slide selector is visible', () => {
  slideSelector().should('be.visible');
});

Then('slide selector is not visible', () => {
  slideSelector().should('not.exist');
});

Then('previous button is visible', () => {
  previousArrowButton().should('be.visible');
});

Then('previous button is not visible', () => {
  previousArrowButton().should('not.exist');
});

Then('previous button is disabled', () => {
  previousArrowButton().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('next button is visible', () => {
  nextArrowButton().should('be.visible');
});

Then('next button is not visible', () => {
  nextArrowButton().should('not.exist');
});

Then('next button is disabled', () => {
  nextArrowButton().should('be.disabled')
    .and('have.attr', 'disabled');
});

When('I set transition to {string}', (transition) => {
  transitionSelect().select(transition);
  cy.wait(300, { log: DEBUG_FLAG }); // required because of component refresh
});

Then('transition is set to {string} with {string}', (transition, direction) => {
  giveTransition(transition, direction).should('exist');
});

When('I click clickable slide', () => {
  slide(1).click();
});
