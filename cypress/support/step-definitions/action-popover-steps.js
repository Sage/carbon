import {
  actionPopoverButton, actionPopover, actionPopoverInnerItem,
  actionPopoverButtonNoIframe,
  actionPopoverSubmenu,
  actionPopoverSubmenuNoIFrame,
  actionPopoverSubmenuInnerElementNoIFrame,
} from '../../locators/action-popover';
import { eventInAction, iconNoIframe } from '../../locators';
import { buttonDataComponent } from '../../locators/button';
import { keyCode } from '../helper';

Then('Action Popover element is visible', () => {
  actionPopover().should('be.visible');
});

Then('Action Popover element is not visible', () => {
  actionPopover().should('not.be.visible');
});

When('I click the menu button element in noiFrame', () => {
  actionPopoverButton().eq(0).click();
});

When('I click the menu button element', () => {
  actionPopoverButtonNoIframe().eq(0).click();
});

When('I press keyboard {string} key times {int} on actionPopover open icon', (key, times) => {
  for (let i = 0; i < times; i++) {
    actionPopoverButton().first().trigger('keydown', keyCode(key));
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

When('I press Enter onto {int} submenu actionPopoverInnerItem', (element) => {
  actionPopoverSubmenu(element).trigger('keydown', { keyCode: 13, which: 13, force: true });
});

When('I press Enter onto {int} submenu actionPopoverInnerItem in noIFrame', (element) => {
  actionPopoverSubmenuInnerElementNoIFrame(element).trigger('keydown', { keyCode: 13, which: 13, force: true });
});

When('I press {word} on first element', (key) => {
  actionPopoverButton().first().trigger('keydown', keyCode(key));
});

Then('{string} action was called in Actions Tab for actionPopover', (event) => {
  eventInAction(event);
});

Then('ActionPopover submenu is not visible', () => {
  actionPopoverSubmenuNoIFrame()
    .should('not.be.visible');
});

Then('Action Popover overriden styles rendered properly', () => {
  actionPopoverButton().children().should('have.css', 'padding-left', '0px')
    .and('have.css', 'padding-right', '0px');
    buttonDataComponent().should('have.css', 'border', '2px solid rgba(0, 0, 0, 0)')
    .and('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'padding-top', '0px')
    .and('have.css', 'padding-bottom', '0px');
  iconNoIframe().should('have.attr', 'data-element', 'dropdown')
    .and('have.css', 'margin-left', '8px')
    .and('have.css', 'margin-right', '0px')
    .and('have.css', 'height', '16px');
  actionPopover().eq(1).should('be.hidden')
    .and('have.css', 'visibility', 'hidden')
    .and('have.css', 'margin', '0px')
    .and('have.css', 'padding', '8px 0px')
    .and('have.css', 'box-shadow', 'rgba(0, 20, 29, 0.2) 0px 5px 5px 0px, rgba(0, 20, 29, 0.1) 0px 10px 10px 0px')
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'left', '0px')
    .and('have.css', 'background-color', 'rgb(255, 255, 255)')
    .and('have.css', 'z-index', '2000');
});
