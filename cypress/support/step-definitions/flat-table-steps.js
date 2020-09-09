import {
  flatTableNoiFrame, flatTableHeaderCellsNoiFrame, flatTableBodyRowByPositionNoiFrame,
  flatTableBodyRowByPosition, flatTableBodyRowByPositionDS,
  flatTableHeaderCellDS, flatTableClickableRowByPositionDS, fltaTableSortableDS,
  flatTableCellDS,
} from '../../locators/flat-table';
import { DEBUG_FLAG } from '..';
import { positionOfElement } from '../helper';
import { iconIFrame } from '../../locators';

Then('FlatTable rows are sticky', () => {
  cy.wait(500);
  for (let i = 0; i <= 3; i++) {
    const color = 'rgb(204, 214, 219)';
    flatTableBodyRowByPositionDS(i).find('th').should('have.css', 'border-right-color', color)
      .and('have.css', 'border-left-color', color)
      .and('have.css', 'border-bottom-color', color)
      .and('have.css', 'position', 'sticky')
      .and('be.visible');
  }
});

Then('FlatTable has sticky header', () => {
  cy.wait(300, { log: DEBUG_FLAG }); // required because element needs to be loaded
  flatTableHeaderCellDS().each(($el) => {
    cy.wrap($el).should('have.css', 'position', 'sticky')
      .and('be.visible');
  });
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
  flatTableClickableRowByPositionDS(index).focus().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});

Then('press Enter key on the row element', () => {
  flatTableBodyRowByPosition(2).focus().trigger('keydown', { keyCode: 13, which: 13, force: true });
});

Then('I click on {string} header {int} times', (position, times) => {
  for (let i = 0; i < times; i++) {
    fltaTableSortableDS().eq(positionOfElement(position)).click();
  }
});

When('{string} column is sorted in {string} order', (position, sortOrder) => {
  const valueOne = 'Tyler Webb';
  const valueTwo = 'Monty Parker';
  const valueThree = 'Jason Atkinson';
  const valueFour = 'Blake Sutton';
  const totalOne = '280';
  const totalTwo = '1349';
  const totalThree = '849';
  const totalFour = '3840';
  if (position === 'first' && sortOrder === 'desc') {
    iconIFrame().should('have.attr', 'data-element', 'sort_down')
      .and('be.visible');
    flatTableCellDS(positionOfElement('first')).should('have.text', valueOne)
      .and('be.visible');
    flatTableCellDS(positionOfElement('third')).should('have.text', valueTwo)
      .and('be.visible');
    flatTableCellDS(positionOfElement('fifth')).should('have.text', valueThree)
      .and('be.visible');
    flatTableCellDS(positionOfElement('seventh')).should('have.text', valueFour)
      .and('be.visible');
  } else if (position === 'first' && sortOrder === 'asc') {
    iconIFrame().should('have.attr', 'data-element', 'sort_up')
      .and('be.visible');
    flatTableCellDS(positionOfElement('first')).should('have.text', valueFour)
      .and('be.visible');
    flatTableCellDS(positionOfElement('third')).should('have.text', valueThree)
      .and('be.visible');
    flatTableCellDS(positionOfElement('fifth')).should('have.text', valueTwo)
      .and('be.visible');
    flatTableCellDS(positionOfElement('seventh')).should('have.text', valueOne)
      .and('be.visible');
  } else if (position === 'second' && sortOrder === 'desc') {
    iconIFrame().should('have.attr', 'data-element', 'sort_down')
      .and('be.visible');
    flatTableCellDS(positionOfElement('second')).should('have.text', totalFour)
      .and('be.visible');
    flatTableCellDS(positionOfElement('fourth')).should('have.text', totalTwo)
      .and('be.visible');
    flatTableCellDS(positionOfElement('sixth')).should('have.text', totalThree)
      .and('be.visible');
    flatTableCellDS(positionOfElement('eighth')).should('have.text', totalOne)
      .and('be.visible');
  } else {
    iconIFrame().should('have.attr', 'data-element', 'sort_up')
      .and('be.visible');
    flatTableCellDS(positionOfElement('second')).should('have.text', totalOne)
      .and('be.visible');
    flatTableCellDS(positionOfElement('fourth')).should('have.text', totalThree)
      .and('be.visible');
    flatTableCellDS(positionOfElement('sixth')).should('have.text', totalTwo)
      .and('be.visible');
    flatTableCellDS(positionOfElement('eighth')).should('have.text', totalFour)
      .and('be.visible');
  }
});

Then('{string} header has focus', (position) => {
  fltaTableSortableDS().eq(positionOfElement(position)).should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});

Then('I focus {string} header cell', (position) => {
  fltaTableSortableDS().eq(positionOfElement(position)).focus();
});

Then('I press {string} on {string} header {int} time(s)', (key, position, count) => {
  for (let i = 0; i < count; i++) {
    if (key === 'Enter') {
      fltaTableSortableDS().eq(positionOfElement(position)).focus()
        .trigger('keydown', { keyCode: 13, which: 13, force: true });
    } else if (key === 'Space') {
      fltaTableSortableDS().eq(positionOfElement(position)).focus()
        .trigger('keydown', { keyCode: 32, which: 32, force: true });
    } else {
      throw new Error('Only Enter or Space key can be applied');
    }
  }
});
