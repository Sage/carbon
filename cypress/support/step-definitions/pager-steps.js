import {
  pagerSummary, pageSelect, maxPages, pageInput, previousArrow, nextArrow,
} from '../../locators/pager';
import { DEBUG_FLAG } from '..';

Then('totalRecords is set to {string}', (totalRecords) => {
  pagerSummary().invoke('text').should('contain', `${totalRecords}  records`);
});

Then('pageSize is set to {string}', (pageSize) => {
  pageSelect().should('have.attr', 'value', pageSize);
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

Then('previous pagination arrow is disabled', () => {
  previousArrow().parent().should('have.attr', 'disabled');
});

Then('next pagination arrow is disabled', () => {
  nextArrow().parent().should('have.attr', 'disabled');
});

Then('I paginate {word} {int} times', (direction, count) => {
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

When('I type {string} to input pagination', (pageNumber) => {
  pageInput().clear().type(`${pageNumber}{enter}`);
});

Then('pagination is visible', () => {
  pageInput().should('be.visible');
});

Then('pagination is not visible', () => {
  pageInput().should('not.exist');
});
