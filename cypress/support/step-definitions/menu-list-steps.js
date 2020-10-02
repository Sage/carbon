import {
  menuListChildren, menuListSearchInput,
  menuSecondOption, menuList, menuSecondOptionIframe,
  menuListSearchInputIframe,
  menuListElements,
} from '../../locators/menu-list';
import { getDataElementByValueAndPosition } from '../../locators';
import { positionOfElement } from '../helper';

Then('title on preview is {word}', (title) => {
  getDataElementByValueAndPosition('title', positionOfElement('first')).should('have.text', title);
});

When('I click into title', () => {
  getDataElementByValueAndPosition('title', positionOfElement('first')).click();
});

When('I click into menu item second element', () => {
  menuSecondOption().click();
});

When('I click into menu item second element in Iframe', () => {
  menuSecondOptionIframe().click();
});

Then('MenuList component is expanded', () => {
  menuListChildren().should('have.length', 4);
});

Then('MenuList component is not expanded', () => {
  menuListElements().should('have.length', 1);
});

Then('filter is disabled', () => {
  menuListSearchInput().should('not.exist');
});

Then('filter is enabled', () => {
  menuListSearchInput().should('exist');
});

When('I change search parameter to {string}', (parameter) => {
  menuListSearchInputIframe().clear().type(parameter);
});

Then('search result is {string}', (text) => {
  menuList().invoke('text').should('contain', text);
});

Then('results count is {int}', (resultsCount) => {
  menuList().children().should('have.length', `${resultsCount + 1}`);
});
