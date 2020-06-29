import {
  menuPreview, menuListItems, submenuBlock,
} from '../../locators/menu';
import { positionOfElement } from '../helper';

Then('Menu {string} element menuType property on preview is {string}', (as, elementPosition) => {
  if (as === 'primary') {
    menuListItems((positionOfElement(elementPosition))).should('have.css', 'background-color', 'rgb(0, 51, 73)')
      .and('have.css', 'color', 'rgb(255, 255, 255)');
  } else if (as === 'secondary') {
    menuListItems((positionOfElement(elementPosition))).should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'color', 'rgb(0, 51, 73)');
  }
});

Then('Menu elements are visible', () => {
  menuPreview().should('be.visible');
});

When('I invoke first expandable Menu component', () => {
  menuListItems(positionOfElement('second')).first().trigger('mouseover');
});

When('I invoke second expandable Menu component', () => {
  menuListItems(positionOfElement('third')).first().trigger('mouseover');
});

Then('Menu first expandable element has {int} items', (parameter) => {
  submenuBlock(positionOfElement('third'), positionOfElement('second')).should('have.length', parameter);
});

Then('Menu second expandable element has {int} link item and {int} list items', (firstParameter, secondParameter) => {
  submenuBlock(positionOfElement('fourth'), positionOfElement('third')).first().should('have.length', firstParameter);
  submenuBlock(positionOfElement('fourth'), positionOfElement('third')).children().should('have.length', secondParameter);
});
