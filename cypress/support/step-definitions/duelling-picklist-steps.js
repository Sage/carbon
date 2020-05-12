import {
  assignedPicklist, unassignedPicklistItems, duellingPicklistComponent, picklistRightLabel,
  picklistLeftLabel, assignedPicklistItems, unassignedPicklist, addButton, removeButton,
  picklistDivider, duellingSearchInput,
} from '../../locators/duelling-picklist/index';
import { checkboxRole } from '../../locators/checkbox/index';
import { positionOfElement, keyCode } from '../helper';

Then('unassigned picklist has {int} items', (items) => {
  unassignedPicklistItems().should('have.length', items);
  picklistLeftLabel().should('have.text', `UNASSIGNED (${items})`);
});

Then('unassigned picklist contains {int} items', (items) => {
  unassignedPicklistItems().should('have.length', items);
});

Then('assigned picklist has {int} items', (items) => {
  assignedPicklistItems().should('have.length', items);
  picklistRightLabel().should('have.text', `ASSIGNED (${items})`);
});

Then('divider is visible', () => {
  picklistDivider().should('be.visible')
    .and('have.css', 'width', '2px')
    .and('have.css', 'background-image', 'linear-gradient(rgb(191, 203, 209) 0%, rgba(191, 203, 209, 0) 99.9%)');
});

Then('assigned picklist is empty', () => {
  assignedPicklistItems().should('have.length', '0');
  assignedPicklist().find('div').should('have.text', 'Nothing to see here');
  picklistRightLabel().should('have.text', 'ASSIGNED (0)');
});

Then('unassigned picklist is empty', () => {
  unassignedPicklistItems().should('have.length', '0');
  unassignedPicklist().find('div').should('have.text', 'Your own placeholder');
  picklistLeftLabel().should('have.text', 'UNASSIGNED (0)');
});

Then('I check Access to all current and new clients checkbox', () => {
  checkboxRole().check();
});

Then('I uncheck Access to all current and new clients checkbox', () => {
  checkboxRole().uncheck();
});

Then('Duelling Picklist is disabled', () => {
  duellingPicklistComponent().should('have.attr', 'disabled');
});

Then('Duelling Picklist is enabled', () => {
  duellingPicklistComponent().should('not.have.attr', 'disabled');
});

When('I add {int} item(s) from unassigned picklist to assigned picklist', (items) => {
  for (let i = 0; i < items; i++) {
    addButton(0).click();
  }
});

Then('I focus first element in assigned picklist', () => {
  assignedPicklistItems().eq(0).focus();
});

When('I press {string} onto element in assigned pick list', (arrow) => {
  assignedPicklistItems().eq(0).trigger('keydown', keyCode(arrow));
});

When('I press {string} onto element in unassigned pick list', (arrow) => {
  unassignedPicklistItems().eq(0).trigger('keydown', keyCode(arrow));
});

Then('I focus first element in unassigned picklist', () => {
  unassignedPicklistItems().eq(0).focus();
});

When('I remove {int} item(s) from assigned picklist', () => {
  removeButton().click({ multiple: true });
});

When('Type {string} text into duelling picklist search input', (text) => {
  duellingSearchInput().clear().type(text);
});

Then('I check {string} element in unassigned picklist', (position) => {
  unassignedPicklistItems().eq(positionOfElement(position)).focus();
});

Then('{string} element inner content is set to {string}', (position, text) => {
  unassignedPicklistItems().eq(positionOfElement(position)).should('contain', text);
});

Then('{string} element has golden border outline {string}', (position, color) => {
  unassignedPicklistItems().eq(positionOfElement(position)).should('have.css', 'outline', color);
});
