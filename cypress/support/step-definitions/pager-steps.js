import {
  pageSelect, maxPages, previousArrow, nextArrow, currentPageInput, pageSelectItems,
} from '../../locators/pager';
import { DEBUG_FLAG } from '..';
import { pagination, paginationButtonByIndex } from '../../locators/table';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;

Then('pageSize is set to {string} {word}', (pageSize, item) => {
  pageSelect().should('have.attr', 'value', pageSize);
  pageSelectItems().invoke('text').should('contain', item);
});

Then('pageSize is visible', () => {
  pageSelect().should('be.visible');
});

Then('pageSize is not visible', () => {
  pageSelect().should('not.be.visible');
});

Then('I am on 1st of {string} pages', (count) => {
  maxPages().should('have.text', ` of ${count}`);
});

Then('pagination {string} button is disabled', (button) => {
  switch (button) {
    case 'next':
      paginationButtonByIndex(TWO).should('be.disabled')
        .and('have.attr', 'disabled');
      break;
    case 'last':
      paginationButtonByIndex(THREE).should('be.disabled')
        .and('have.attr', 'disabled');
      break;
    case 'previous':
      paginationButtonByIndex(ONE).should('be.disabled')
        .and('have.attr', 'disabled');
      break;
    case 'first':
      paginationButtonByIndex(ZERO).should('be.disabled')
        .and('have.attr', 'disabled');
      break;
    default: throw new Error('There are only four pagination buttons');
  }
});

Then('I click {string} pagination button', (button) => {
  switch (button) {
    case 'next':
      paginationButtonByIndex(TWO).click();
      break;
    case 'last':
      paginationButtonByIndex(THREE).click();
      break;
    case 'previous':
      paginationButtonByIndex(ONE).click();
      break;
    case 'first':
      paginationButtonByIndex(ZERO).click();
      break;
    default: throw new Error('There are only four pagination buttons');
  }
});

Then('I click {string} pagination arrow', (arrow) => {
  switch (arrow) {
    case 'previousArrow':
      nextArrow().parent().click();
      previousArrow().parent().click();
      break;
    case 'nextArrow':
      nextArrow().parent().click();
      break;
    default: throw new Error('There are only two pagination arrows');
  }
});

Then('pagination buttons are disabled', () => {
  const buttonsAmount = 4;
  for (let i = 0; i < buttonsAmount; i++) {
    paginationButtonByIndex(i).should('have.attr', 'disabled');
  }
});

Then('previous pagination arrow is disabled', () => {
  previousArrow().parent().should('have.attr', 'disabled');
});

Then('next pagination arrow is disabled', () => {
  nextArrow().parent().should('have.attr', 'disabled');
});

Then('I click {word} {int} times', (direction, count) => {
  for (let i = 0; i < count; i++) {
    // click force true because element is overlapping
    switch (direction) {
      case 'next':
        cy.wait(100, { log: DEBUG_FLAG }); // wait added due to refreshing element
        nextArrow().click({ force: true });
        break;
      case 'previous':
        cy.wait(100, { log: DEBUG_FLAG }); // wait added due to refreshing element
        previousArrow().click({ force: true });
        break;
      default: throw new Error('Direction can be only next or previous');
    }
  }
});

Then('I press {word} button {int} times', (direction, count) => {
  for (let i = 0; i < count; i++) {
    // click force true because element is overlapping
    switch (direction) {
      case 'next':
        cy.wait(100, { log: DEBUG_FLAG }); // wait added due to refreshing element
        paginationButtonByIndex(TWO).click({ force: true });
        break;
      case 'previous':
        cy.wait(100, { log: DEBUG_FLAG }); // wait added due to refreshing element
        paginationButtonByIndex(ONE).click({ force: true });
        break;
      default: throw new Error('Direction can be only next or previous');
    }
  }
});

When('I type {string} to input pagination for classic pager component', (pageNumber) => {
  currentPageInput().clear().type(`${pageNumber}{enter}`);
});

When('I type {string} to input pagination', (pageNumber) => {
  currentPageInput().clear().type(`${pageNumber}{enter}`);
});

Then('pagination is visible', () => {
  pagination().should('be.visible');
});


Then('pagination is not visible', () => {
  pagination().should('not.exist');
});

When('I click on pagination input', () => {
  currentPageInput().click();
});

Then('pagination input has golden border', () => {
  currentPageInput().parent().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});
