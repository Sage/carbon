import {
  slide, slideIndexSelect, carousel, nextArrowButton, previousArrowButton, slideSelectorIndex,
  enableSlideSelectorCheckbox, slideSelector, enableNextButtonCheckbox, enablePreviousButtonCheckbox, transitionSelect, newSlide
} from '../../locators/carouselLocators';
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
    default: throw 'Direction can be only left or right';
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

When('I enable slide selector', () => {
  enableSlideSelectorCheckbox().check();
});

When('I disable slide selector', () => {
  enableSlideSelectorCheckbox().uncheck();
});

Then('slide selector is visible', () => {
  slideSelector().should('be.visible');
});

Then('slide selector is not visible', () => {
  slideSelector().should('not.exist');
});

When('I enable previous button', () => {
  enablePreviousButtonCheckbox().check();
});

When('I disable previous button', () => {
  enablePreviousButtonCheckbox().uncheck();
});

Then('previous button is visible', () => {
  previousArrowButton().should('be.visible');
});

Then('previous button is not visible', () => {
  previousArrowButton().should('not.exist');
});

When('I enable next button', () => {
  enableNextButtonCheckbox().check();
});

When('I disable next button', () => {
  enableNextButtonCheckbox().uncheck();
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
  newSlide(transition, direction).should('exist');
});
