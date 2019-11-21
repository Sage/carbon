import {
  actionPopoverButton, actionPopover, actionPopoverInnerItem,
  actionPopoverButtonNoIframe,
} from '../../locators/action-popover';

Then('Action Popover element is visible', () => {
  actionPopover().should('be.visible');
});

Then('Action Popover element is not visible', () => {
  actionPopover().should('not.be.visible');
});

When('I click the menu button element', () => {
  actionPopoverButton().eq(0).click();
});

When('I click the menu button element with iFrame', () => {
  actionPopoverButtonNoIframe().eq(0).click();
});

When('I press keyboard {string} key times {int} on actionPopover open icon', (key, times) => {
  for (let i = 0; i < times; i++) {
    actionPopoverButton().first().type(`${key}`);
  }
});

Then('Action Popover element has golden border on focus', () => {
  cy.focused().should('have.css', 'box-shadow', 'rgb(255, 181, 0) 0px 0px 0px 2px inset');
});

Then('Action Popover element has blue border on focus', () => {
  cy.focused().should('have.css', 'box-shadow', 'rgb(37, 91, 199) 0px 0px 0px 1px inset');
});

When('I click {int} actionPopoverInnerItem', (element) => {
  actionPopoverInnerItem(element).click();
});

When('I press {string} actionPopoverInnerItem onto {int} element', (key, element) => {
  actionPopoverInnerItem(element).type(`{${key}}`);
});
