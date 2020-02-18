import {
  flatTableStickyRowHeader, flatTableBodyRow, flatTableHeaderCell,
  flatTabelCellContent, flatTable, flatTableBodyRowByPosition, flatTableHeader,
} from '../../locators/flat-table';
import { DEBUG_FLAG } from '..';

const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;
const THIRD_ELEMENT = 2;
const FOURTH_ELEMENT = 3;
const FIFTH_ELEMENT = 4;
const SIXTH_ELEMENT = 5;
const SEVENTH_ELEMENT = 6;

Then('FlatTable has sticky row header', () => {
  const color = 'rgb(204, 214, 218)';
  const rowHeaderAmount = 8;
  for (let i = 1; i <= rowHeaderAmount; i++) {
    flatTableStickyRowHeader(i).should('have.css', 'border-right-color', color)
      .and('have.css', 'border-left-color', color)
      .and('have.css', 'border-bottom-color', color)
      .and('have.css', 'position', 'sticky')
      .and('be.visible');
  }
});

Then('FlatTable has sticky header', () => {
  cy.wait(300, { log: DEBUG_FLAG }); // required because element needs to be loaded
  const headerCellAmount = 6;
  for (let i = 0; i <= headerCellAmount; i++) {
    flatTableHeaderCell(i).should('have.css', 'position', 'sticky')
      .and('be.visible');
  }
});

Then('FlatTable has nine rows', () => {
  flatTableHeader().should('have.length', 1);
  flatTableBodyRow().should('have.length', 8);
});

Then('FlatTable has seven columns', () => {
  flatTableHeader().find('th').should('have.length', 7);
});

Then('{string} header cell has value {string}', (position, text) => {
  switch (position) {
    case 'first':
      flatTableHeaderCell(FIRST_ELEMENT).should('have.text', text)
        .and('be.visible');
      break;
    case 'second':
      flatTableHeaderCell(SECOND_ELEMENT).should('have.text', text)
        .and('be.visible');
      break;
    case 'third':
      flatTableHeaderCell(THIRD_ELEMENT).should('have.text', text)
        .and('be.visible');
      break;
    case 'fourth':
      flatTableHeaderCell(FOURTH_ELEMENT).should('have.text', text)
        .and('be.visible');
      break;
    case 'fifth':
      flatTableHeaderCell(FIFTH_ELEMENT).should('have.text', text)
        .and('be.visible');
      break;
    case 'sixth':
      flatTableHeaderCell(SIXTH_ELEMENT).should('have.text', text)
        .and('be.visible');
      break;
    case 'seventh':
      flatTableHeaderCell(SEVENTH_ELEMENT).should('have.text', text)
        .and('be.visible');
      break;
    default: throw new Error('There are only seven FlatTable header cells on the page');
  }
});

Then('FlatTable {int} row contains proper inner content', (indexRow) => {
  flatTabelCellContent(indexRow).eq(FIRST_ELEMENT).should('have.text', 'Soylent CorpJohn Doe')
    .and('be.visible');
  flatTabelCellContent(indexRow).eq(SECOND_ELEMENT).should('have.text', 'business')
    .and('be.visible');
  flatTabelCellContent(indexRow).eq(THIRD_ELEMENT).should('have.text', 'Group1, Group2, Group3')
    .and('be.visible');
  flatTabelCellContent(indexRow).eq(FOURTH_ELEMENT).should('have.text', 'Accounting')
    .and('be.visible');
  flatTabelCellContent(indexRow).eq(FIFTH_ELEMENT).should('have.text', '12/12/20')
    .and('be.visible');
  flatTabelCellContent(indexRow).eq(SIXTH_ELEMENT).should('have.text', '20/12/20')
    .and('be.visible');
  flatTabelCellContent(indexRow).eq(SEVENTH_ELEMENT).should('have.text', '25/12/20')
    .and('be.visible');
});

Then('I scroll tabel content to right bottom', () => {
  cy.viewport(625, 450);
  flatTable().parent().scrollTo('100%', '100%');
});

Then('{string} header cell is not visible', (position) => {
  switch (position) {
    case 'second':
      flatTableHeaderCell(SECOND_ELEMENT).and('not.be.visible');
      break;
    case 'third':
      flatTableHeaderCell(THIRD_ELEMENT).and('not.be.visible');
      break;
    case 'fourth':
      flatTableHeaderCell(FOURTH_ELEMENT).and('not.be.visible');
      break;
    case 'fifth':
      flatTableHeaderCell(FIFTH_ELEMENT).and('not.be.visible');
      break;
    default: throw new Error('There are only four not visible FlatTable cells on the page');
  }
});

Then('{int} FlatTable rows are not visible', (notVisibleRowAmount) => {
  for (let i = 0; i < notVisibleRowAmount; i++) {
    flatTableBodyRowByPosition(i).should('not.be.visible');
  }
});

Then('{int} FlatTable rows are visible', (visibleRowAmount) => {
  for (let i = 2; i <= visibleRowAmount; i++) {
    flatTableBodyRowByPosition(i).should('be.visible');
  }
});
