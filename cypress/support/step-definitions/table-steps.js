import {
  rows, checkboxCell, rowByNumber, caption, tableHeader,
} from '../../locators/table';

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

Then('caption is set to {string}', (text) => {
  caption().should('have.text', text);
});

Then('theme on preview is {string}', (theme) => {
  switch (theme) {
    case 'primary':
      tableHeader().should('have.css', 'background-color', 'rgb(51, 91, 109)');
      tableHeader().should('have.css', 'color', 'rgb(255, 255, 255)');
      break;
    case 'secondary':
      tableHeader().should('have.css', 'background-color', 'rgb(204, 214, 218)');
      tableHeader().should('have.css', 'color', 'rgb(0, 51, 73)');
      break;
    // will be only for a dafault theme
    // case 'tertiary':
    //   tableHeader().should('have.css', 'background-color', 'transparent');
    //   tableHeader().should('have.css', 'color', 'rgba(0,0,0,0.9)');
    //   break;
    default: throw new Error('Themes are only primary or seconary');
  }
});
