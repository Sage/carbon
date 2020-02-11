import {
  actionPopoverButton, actionPopover, actionPopoverInnerItem,
  actionPopoverButtonNoIframe,
  actionPopoverSubmenu,
} from '../../locators/action-popover';
import { eventInAction } from '../../locators';

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
    switch (key) {
      case 'enter':
        actionPopoverButton().first().trigger('keydown', { keyCode: 13, which: 13 });
        break;
      case 'space':
        actionPopoverButton().first().trigger('keydown', { keyCode: 32, which: 32 });
        break;
      default: throw new Error('There are only two other keyboard keys could be used');
    }
  }
});

Then('Action Popover element has golden border on focus', () => {
  cy.focused().should('have.css', 'box-shadow', 'rgb(255, 181, 0) 0px 0px 0px 2px inset');
});

Then('Action Popover element has blue border on focus', () => {
  cy.focused().should('have.css', 'box-shadow', 'rgb(37, 91, 199) 0px 0px 0px 1px inset');
});

When('I click {int} actionPopoverInnerItem', (element) => {
  actionPopoverInnerItem(element).click({ force: true });
});

When('I click {int} submenu actionPopoverInnerItem', (element) => {
  actionPopoverSubmenu(element).click({ force: true });
});

When('I press {string} onto {int} actionPopoverInnerItem', (key, element) => {
  actionPopoverInnerItem(element).type(`{${key}}`);
});

When('I press enter onto {int} submenu actionPopoverInnerItem', (element) => {
  actionPopoverSubmenu(element).trigger('keydown', { keyCode: 13, which: 13, force: true });
});

When('I press downarrow on focused element', () => {
  actionPopoverButton().first().trigger('keydown', { keyCode: 40, which: 40 });
});

Then('{string} action was called in Actions Tab for actionPopover', (event) => {
  eventInAction(event);
});
