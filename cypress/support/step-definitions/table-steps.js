import {
  rows, checkboxCell, rowByNumber, caption, tableHeader, rowNumbers, sortIcon,
  actionToolbar, checkboxInHeader, actionToolbarButton,
} from '../../locators/table';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const SIX = 6;
const SEVEN = 7;
const EIGHT = 8;
const NINE = 9;

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

When('row number {int} is highlighted', (rowNumber) => {
  rowByNumber(rowNumber).should('have.css', 'cursor', 'pointer');
});

When('row number {int} is not highlighted', (rowNumber) => {
  rowByNumber(rowNumber).should('not.have.css', 'cursor', 'pointer');
});

When('{string} Table column can be sorted', (headerName) => {
  if (headerName === 'Country') {
    sortIcon(ZERO).should('have.attr', 'data-element', 'sort_up')
      .and('be.visible');
  } else {
    sortIcon(ONE).should('have.attr', 'data-element', 'sort_up')
      .and('be.visible');
  }
});

When('Country column is sorted in {string} order', (sortOrder) => {
  if (sortOrder === 'desc') {
    sortIcon(ZERO).should('have.attr', 'data-element', 'sort_down')
      .and('be.visible');
    rowNumbers(ZERO).should('have.text', 'Zimbabwe');
    rowNumbers(TWO).should('have.text', 'Zambia');
    rowNumbers(FOUR).should('have.text', 'Zaire');
    rowNumbers(SIX).should('have.text', 'Yemen');
    rowNumbers(EIGHT).should('have.text', 'Western Sahara');
  } else {
    sortIcon(ZERO).should('have.attr', 'data-element', 'sort_up')
      .and('be.visible');
    rowNumbers(ZERO).should('have.text', 'Afghanistan');
    rowNumbers(TWO).should('have.text', 'Albania');
    rowNumbers(FOUR).should('have.text', 'Algeria');
    rowNumbers(SIX).should('have.text', 'Andorra');
    rowNumbers(EIGHT).should('have.text', 'Angola');
  }
});

When('Code column is sorted in {string} order', (sortOrder) => {
  if (sortOrder === 'desc') {
    sortIcon(ZERO).should('have.attr', 'data-element', 'sort_down')
      .and('be.visible');
    rowNumbers(ONE).should('have.text', 'ZW');
    rowNumbers(THREE).should('have.text', 'ZM');
    rowNumbers(FIVE).should('have.text', 'ZR');
    rowNumbers(SEVEN).should('have.text', 'YE');
    rowNumbers(NINE).should('have.text', 'EH');
  } else {
    sortIcon(ZERO).should('have.attr', 'data-element', 'sort_up')
      .and('be.visible');
    rowNumbers(ONE).should('have.text', 'AF');
    rowNumbers(THREE).should('have.text', 'AL');
    rowNumbers(FIVE).should('have.text', 'DZ');
    rowNumbers(SEVEN).should('have.text', 'AD');
    rowNumbers(NINE).should('have.text', 'AO');
  }
});

Then('caption is set to {string}', (text) => {
  caption().should('have.text', text);
});

Then('theme on preview is {string}', (theme) => {
  switch (theme) {
    case 'primary':
      tableHeader().should('have.css', 'background-color', 'rgb(51, 91, 109)');
      break;
    case 'secondary':
      tableHeader().should('have.css', 'background-color', 'rgb(204, 214, 218)');
      break;
    case 'tertiary':
      tableHeader().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      break;
    default: throw new Error('Themes are only primary or seconary');
  }
});

When('{int} row has zebra striping', (rowNumber) => {
  rowNumbers(rowNumber).should('have.css', 'background-color', 'rgb(249, 250, 251)');
});

Then('Table header size on preview is set to {string}', (size) => {
  switch (size) {
    case 'compact':
      tableHeader().eq(ZERO).should('have.css', 'height', '25px');
      tableHeader().eq(ONE).should('have.css', 'height', '25px');
      break;
    case 'small':
      tableHeader().eq(ZERO).should('have.css', 'height', '32px');
      tableHeader().eq(ONE).should('have.css', 'height', '32px');
      break;
    case 'medium':
      tableHeader().eq(ZERO).should('have.css', 'height', '40px');
      tableHeader().eq(ONE).should('have.css', 'height', '40px');
      break;
    case 'large':
      tableHeader().eq(ZERO).should('have.css', 'height', '48px');
      tableHeader().eq(ONE).should('have.css', 'height', '48px');
      break;
    default: throw new Error('There is no such size for a Table header component');
  }
});

Then('input type on preview is set to {string}', (type) => {
  switch (type) {
    case 'textbox':
      rowNumbers(ZERO).find('input').should('have.attr', 'data-element', 'input');
      break;
    case 'textarea':
      rowNumbers(ZERO).find('textarea');
      break;
    case 'date':
      rowNumbers(ZERO).children().should('have.attr', 'data-component', 'date');
      break;
    default: throw new Error('There are only three input type of Table with inputs');
  }
});

Then('I click {string} header', (headerName) => {
  if (headerName === 'Country') {
    tableHeader().eq(ZERO).click();
  } else {
    tableHeader().eq(ONE).click();
  }
});

When('I check checkbox on header', () => {
  checkboxInHeader().eq(ZERO).click();
});

Then('Action Toolbar elemens are visible and have {string} color', (color) => {
  actionToolbar(ZERO).find('span').should('have.attr', 'data-element', 'bin')
    .and('have.css', 'color', color)
    .and('be.visible');
  actionToolbar(ONE).find('span').should('have.attr', 'data-element', 'settings')
    .and('have.css', 'color', color)
    .and('be.visible');
  actionToolbar(TWO).find('button').should('have.attr', 'data-element', 'toggle-button')
    .and('have.css', 'border-bottom-color', color)
    .and('have.css', 'border-left-color', color)
    .and('have.css', 'border-right-color', color)
    .and('have.css', 'border-top-color', color)
    .and('have.css', 'color', color)
    .and('be.visible')
    .and('contain', 'Actions');
  actionToolbarButton().parent().should('have.attr', 'data-component', 'button')
    .and('have.css', 'border-bottom-color', color)
    .and('have.css', 'border-left-color', color)
    .and('have.css', 'border-right-color', color)
    .and('have.css', 'border-top-color', color)
    .and('have.css', 'color', color)
    .and('be.visible')
    .and('contain', 'Test Action');
});
