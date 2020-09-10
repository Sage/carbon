import {
  slide,
  nextArrowButton,
  previousArrowButton,
  slideIFrame,
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

Then('previous button is disabled', () => {
  previousArrowButton().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('next button is disabled', () => {
  nextArrowButton().should('be.disabled')
    .and('have.attr', 'disabled');
});

When('I click clickable slide', () => {
  slideIFrame(1).click();
});
