import {
  menuPreview, menuListItems, submenuBlock, menuListItemButton, menuListItemsNoIFrame,
} from '../../locators/menu';
import { positionOfElement } from '../helper';

const CARBON_BUTTON_PREFIX = 'carbon-menu carbon-menu--';

Then('Menu as property on preview is {string}', (as) => {
  menuPreview().should('have.class', `${CARBON_BUTTON_PREFIX}${as}`);
});

Then('Menu elements are visible', () => {
  menuPreview().should('be.visible');
});

When('I click on first item in Menu component', () => {
  menuListItemButton(positionOfElement('second')).click();
});

When('I invoke first expandable Menu component', () => {
  menuListItems(positionOfElement('second')).trigger('mouseover');
});

When('I invoke {string} expandable Menu component noIfame', (menuListItem) => {
  menuListItemsNoIFrame(positionOfElement(menuListItem)).invoke('attr', 'style', 'display: block !important;');
});

When('I invoke second expandable Menu component', () => {
  menuListItems(positionOfElement('third')).trigger('mouseover');
});

Then('Menu first expandable element has {int} items', (parameter) => {
  submenuBlock(positionOfElement('third'), positionOfElement('second')).should('have.length', parameter);
});

Then('Menu second expandable element has {int} link item and {int} list items', (firstParameter, secondParameter) => {
  submenuBlock(positionOfElement('fourth'), positionOfElement('third')).first().should('have.length', firstParameter);
  submenuBlock(positionOfElement('fourth'), positionOfElement('third')).children().should('have.length', secondParameter);
});
