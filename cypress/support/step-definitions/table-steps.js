import {
  rows, checkboxCell, rowByNumber, caption, table,
} from '../../locators/table';

const THEME_PREFIX = 'carbon-table--';
const CLICKABLE = 'carbon-table-row--clickable';
const HIGHLIGHTED = 'carbon-table-row--highlighted';

Then('I see {int} records', (records) => {
  rows().should('have.length', records);
});

Then('rows are selectable', () => {
  checkboxCell().should('exist');
});

Then('rows are not selectable', () => {
  checkboxCell().should('not.exist');
});

When('I click row by number {int}', (rowNumber) => {
  rowByNumber(rowNumber).click();
});

When('row number {int} is clickable', (rowNumber) => {
  cy.wait(500); // required because we wait for class change inside iFrame
  rowByNumber(rowNumber).should('have.class', CLICKABLE);
});

When('row number {int} is not clickable', (rowNumber) => {
  cy.wait(500); // required because we wait for class change inside iFrame
  rowByNumber(rowNumber).should('not.have.class', CLICKABLE);
});

When('row number {int} is highlighted', (rowNumber) => {
  rowByNumber(rowNumber).should('have.class', HIGHLIGHTED);
});

When('row number {int} is not highlighted', (rowNumber) => {
  rowByNumber(rowNumber).should('not.have.class', HIGHLIGHTED);
});

Then('caption is set to {string}', (text) => {
  caption().should('have.text', text);
});

Then('theme on preview is {string}', (theme) => {
  table().should('have.class', `${THEME_PREFIX}${theme}`);
});
