import {
  slide,
  nextArrowButton,
  previousArrowButton,
  slideSelector,
  giveTransition,
} from '../../locators/carousel';

function clickCarouselButton(direction) {
  switch (direction) {
    case 'left':
      previousArrowButton().click();
      break;
    case 'right':
      nextArrowButton().click();
      break;
    default: throw new Error('Direction can be only left or right');
  }
}

Then('slide {int} title is {string}', (index, title) => {
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

Then('transition is set to {string} with {string}', (transition, direction) => {
  giveTransition(transition, direction).should('exist');
});

When('I click clickable slide', () => {
  slide(1).click();
});
