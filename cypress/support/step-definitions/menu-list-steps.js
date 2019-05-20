import {
  menuTitle, menuListChildren, menuListSearchInput,
  menuSecondOption, menuList,
} from '../../locators/menu-list';

Then('title on preview is {string}', (title) => {
  menuTitle().should('have.text', title);
});

When('I click into title', () => {
  menuTitle().click();
});

When('I click into menu item second element', () => {
  menuSecondOption().click();
});

Then('MenuList component is expanded', () => {
  menuListChildren().should('have.length', 4);
});

Then('MenuList component is not expanded', () => {
  menuListChildren().should('have.length', 0);
});

Then('filter is disabled', () => {
  menuListSearchInput().should('not.exist');
});

Then('filter is enabled', () => {
  menuListSearchInput().should('exist');
});

When('I change search parameter to {string}', (parameter) => {
  menuListSearchInput().clear().type(parameter);
});

Then('search result is {string}', (text) => {
  menuList().invoke('text').should('contain', text);
});

Then('results count is {int}', (resultsCount) => {
  menuList().children().should('have.length', `${resultsCount + 1}`);
});
