import {
  menuPreview, menuListItems, submenuBlock,
} from '../../locators/menu';

const CARBON_BUTTON_PREFIX = 'carbon-menu carbon-menu--';
const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;
const THIRD_ELEMENT = 3;

Then('Menu as property on preview is {string}', (as) => {
  menuPreview().should('have.class', `${CARBON_BUTTON_PREFIX}${as}`);
});

Then('Menu elements are visible', () => {
  menuPreview().should('be.visible');
});

When('I invoke first expandable Menu component', () => {
  menuListItems(FIRST_ELEMENT).trigger('mouseover');
});

When('I invoke second expandable Menu component', () => {
  menuListItems(SECOND_ELEMENT).trigger('mouseover');
});

Then('Menu first expandable element has {int} items', (parameter) => {
  submenuBlock(SECOND_ELEMENT, FIRST_ELEMENT).should('have.length', parameter);
});

Then('Menu second expandable element has {int} link item and {int} list items', (firstParameter, secondParameter) => {
  submenuBlock(THIRD_ELEMENT, FIRST_ELEMENT).should('have.length', firstParameter);
  submenuBlock(THIRD_ELEMENT, SECOND_ELEMENT).should('have.length', secondParameter);
});
