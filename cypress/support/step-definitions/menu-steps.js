import {
  menuPreview,
  menuListItems,
  submenuBlock,
  innerMenu,
} from '../../locators/menu';
import { positionOfElement } from '../helper';

Then('Menu elements are visible', () => {
  menuPreview().should('be.visible');
});

When('I hover over third expandable Menu component', () => {
  menuListItems().trigger('mouseover');
});

Then('Menu third expandable element has inner elements', () => {
  submenuBlock().children().should('have.length', 4);
  innerMenu(positionOfElement('second')).should('have.attr', 'data-component', 'link');
  innerMenu(positionOfElement('third')).should('have.attr', 'data-component', 'menu-divider');
  innerMenu(positionOfElement('fourth')).should('have.attr', 'data-component', 'link');
  innerMenu(positionOfElement('fifth')).should('have.attr', 'data-component', 'link');
});
