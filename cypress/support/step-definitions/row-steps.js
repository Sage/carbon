import { column, row } from '../../locators/row';

const DIVIDE = 'carbon-column--column-divide';
const GUTTER_PREFIX = 'carbon-row--gutter-';
const COLUMN_ALIGN_PREFIX = 'carbon-column--align-';
const COLUMN_OFFSET_PREFIX = 'carbon-column--offset-';
const COLUMN_SPAN_PREFIX = 'carbon-column--span-';

Then('columnDivide is set', () => {
  column().should('have.class', DIVIDE);
});

Then('columnDivide is not set', () => {
  column().should('not.have.class', DIVIDE);
});

Then('gutter on preview is {string}', (gutter) => {
  row().should('have.class', `${GUTTER_PREFIX}${gutter}`);
});

Then('columnAlign on preview is {string}', (direction) => {
  column().should('have.class', `${COLUMN_ALIGN_PREFIX}${direction}`);
});

Then('columnOffset on preview is {string}', (offset) => {
  column().should('have.class', `${COLUMN_OFFSET_PREFIX}${offset}`);
});

Then('columnSpan on preview is {string}', (span) => {
  column().should('have.class', `${COLUMN_SPAN_PREFIX}${span}`);
});

Then('column text is {string}', (text) => {
  column().first().should('have.text', text);
});
