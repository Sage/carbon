import { tabs, tabById, tabContentById } from '../../locators/tabs';

const TAB_CONTENT = 'Content for tab ';

Then('Tabs component is align to {string}', (value) => {
  tabs().should('have.css', 'text-align', value);
});

Then('Tabs component posistion is set to {string}', (value) => {
  tabs().should('have.css', 'flex-direction', value);
});

Then('I open tab {int}', (id) => {
  tabById(id).click();
});

Then('Tab {int} content is visible', (id) => {
  tabContentById(id).should('be.visible').should('have.text', `${TAB_CONTENT}${id}`);
});
