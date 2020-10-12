import { tabById, tabContentById } from '../../locators/tabs';

const TAB_CONTENT = 'Content for tab ';

Then('I open Tab {int}', (id) => {
  tabById(id).click();
});

Then('Tab {int} content is visible', (id) => {
  tabContentById(id).should('be.visible').and('have.text', `${TAB_CONTENT}${id}`);
});
