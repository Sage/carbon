import { actionPopoverButton, actionPopover, actionPopoverInnerItem } from '../../locators/action-popover';

Then('Action Popover element is visible', () => {
  actionPopover().should('be.visible');
});

When('I open Action Popover element', () => {
  actionPopoverButton().eq(0).click();
});

When('I press keyboard {string} key times {int}', (key, times) => {
  for (let i = 0; i < times; i++) {
    actionPopover().eq(0).trigger(`{${key}}`);
  }
});

Then('Action Popover element {string} inner context is set to {string}', (element, text) => {
  cy.focused().should('have', actionPopoverInnerItem(element));
  actionPopoverInnerItem(element).invoke('text').should('contain', text);
});

When('I click {int} actionPopoverInnerItem', (element) => {
  actionPopoverInnerItem(element).click();
});
