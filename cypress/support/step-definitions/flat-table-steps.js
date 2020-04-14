import {
  flatTableHeaderCells, flatTableHeader, flatTableBodyRows, flatTableNoiFrame,
  flatTableHeaderCellsNoiFrame, flatTableBodyRowByPositionNoiFrame, flatTableBodyCellByPosition, flatTableBodyRowByPosition,
} from '../../locators/flat-table';
import { DEBUG_FLAG } from '..';
import { positionOfElement } from '../helper';

Then('FlatTable rows are sticky', () => {
  cy.wait(500);
  for (let i = 0; i <= 7; i++) {
    const color = 'rgb(204, 214, 218)';
    flatTableBodyRowByPosition(i).find('th').should('have.css', 'border-right-color', color)
      .and('have.css', 'border-left-color', color)
      .and('have.css', 'border-bottom-color', color)
      .and('have.css', 'position', 'sticky')
      .and('be.visible');
  }
});

Then('FlatTable has sticky header', () => {
  cy.wait(300, { log: DEBUG_FLAG }); // required because element needs to be loaded
  flatTableHeaderCells().each(($el) => {
    cy.wrap($el).should('have.css', 'position', 'sticky')
      .and('be.visible');
  });
});

Then('FlatTable has nine rows', () => {
  flatTableHeader().should('have.length', 1);
  flatTableBodyRows().should('have.length', 8);
});

Then('FlatTable has seven columns', () => {
  flatTableHeaderCells().should('have.length', 7);
});

Then('{string} header cell has value {string}', (position, text) => {
  flatTableHeaderCells().eq(positionOfElement(position)).should('have.text', text)
    .and('be.visible');
});

Then('{int} header cells are {string} visible', (count, state) => {
  if (state === 'not') {
    for (let i = 1; i < count; i++) {
      flatTableHeaderCellsNoiFrame().eq(i).should('not.be.visible');
    }
  } else {
    flatTableHeaderCellsNoiFrame().eq(0).should('be.visible');
    for (let i = count; i <= 6; i++) {
      flatTableHeaderCellsNoiFrame().eq(i).should('be.visible');
    }
  }
});

Then('FlatTable {int} row contains proper inner content', (indexRow) => {
  flatTableBodyCellByPosition(indexRow, positionOfElement('first')).should('have.text', 'Soylent CorpJohn Doe')
    .and('be.visible');
  flatTableBodyCellByPosition(indexRow, positionOfElement('second')).should('have.text', 'business')
    .and('be.visible');
  flatTableBodyCellByPosition(indexRow, positionOfElement('third')).should('have.text', 'Group1, Group2, Group3')
    .and('be.visible');
  flatTableBodyCellByPosition(indexRow, positionOfElement('fourth')).should('have.text', 'Accounting')
    .and('be.visible');
  flatTableBodyCellByPosition(indexRow, positionOfElement('fifth')).should('have.text', '12/12/20')
    .and('be.visible');
  flatTableBodyCellByPosition(indexRow, positionOfElement('sixth')).should('have.text', '20/12/20')
    .and('be.visible');
  flatTableBodyCellByPosition(indexRow, positionOfElement('seventh')).should('have.text', '25/12/20')
    .and('be.visible');
});

Then('I scroll table content to right bottom', () => {
  cy.viewport(625, 450);
  flatTableNoiFrame().parent().scrollTo('100%', '100%');
});

Then('{int} FlatTable rows are {string} visible', (count, state) => {
  if (state === 'not') {
    for (let i = 1; i < 2; i++) {
      flatTableBodyRowByPositionNoiFrame(i).should('not.be.visible');
    }
  } else {
    for (let i = 3; i <= 8; i++) {
      flatTableBodyRowByPositionNoiFrame(i).should('be.visible');
    }
  }
});

Then('I click on {int} body row', (index) => {
  flatTableBodyRowByPosition(index).click();
});

Then('I focus {int} row and focused row element has golden border on focus', (index) => {
  cy.wait(500, { log: DEBUG_FLAG }); // wait was added due to changing animation
  flatTableBodyRowByPosition(index).focus().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});

Then('press Enter key on the row element', () => {
  flatTableBodyRowByPosition(2).focus().trigger('keydown', { keyCode: 13, which: 13, force: true });
});
