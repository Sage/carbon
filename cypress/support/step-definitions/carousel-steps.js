import {
  slide, slideIndexSelect, carousel, nextArrowButton, previousArrowButton, slideSelectorIndex,
  slideSelector, transitionSelect, giveTransition,
} from '../../locators/carousel';
import { DEBUG_FLAG } from '..';

function waitForCarouselMove() {
  carousel().should('have.length', 2, { log: DEBUG_FLAG }); // two slides visible during carousel move
  carousel().should('have.length', 1, { log: DEBUG_FLAG }); // one slide visible after carousel move
}

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

Then('slide title is {string}', (title) => {
  slide().should('have.text', title);
});

When('I set slide index to {int}', (index) => {
  if (index > 0) { // no need to set index for 0 because is default set
    slideIndexSelect().select(index.toString());
    waitForCarouselMove();
  }
});

Then('I move carousel {string}', (direction) => {
  clickCarouselButton(direction);
  waitForCarouselMove();
});

Then('I click carousel {string} button', (direction) => {
  clickCarouselButton(direction);
});

When('I set slide selector {int}', (index) => {
  if (index > 0) { // no need to set index for 0 because is default set
    slideSelectorIndex(index).click();
    waitForCarouselMove();
  }
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

Then('next button is visible', () => {
  nextArrowButton().should('be.visible');
});

Then('next button is not visible', () => {
  nextArrowButton().should('not.exist');
});

When('I set transition to {string}', (transition) => {
  transitionSelect().select(transition);
});

Then('transition is set to {string} with {string}', (transition, direction) => {
  giveTransition(transition, direction).should('exist');
});
