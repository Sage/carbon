import {
  menuPreview,
  submenuBlock,
  innerMenu,
  submenu,
  scrollBlock,
  lastSubmenuElement,
} from '../../locators/menu';
import { positionOfElement } from '../helper';

Then('Menu elements are visible', () => {
  menuPreview().should('be.visible');
});

When('I hover over third expandable Menu component', () => {
  submenu().trigger('mouseover');
});

Then('Menu third expandable element has inner elements', () => {
  submenuBlock().children().should('have.length', 4);
  innerMenu(positionOfElement('second')).should('have.attr', 'data-component', 'link');
  innerMenu(positionOfElement('third')).should('have.attr', 'data-component', 'menu-divider');
  innerMenu(positionOfElement('fourth')).should('have.attr', 'data-component', 'link');
  innerMenu(positionOfElement('fifth')).should('have.attr', 'data-component', 'link');
});

When('I open the {string} submenu', (position) => {
  submenu().eq(positionOfElement(position)).trigger('mouseover');
});

When('I scroll to the bottom of the block', () => {
  scrollBlock().scrollTo('bottom');
});

Then('The last element is visible', () => {
  lastSubmenuElement().should('be.visible');
});
