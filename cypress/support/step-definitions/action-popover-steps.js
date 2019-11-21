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

When('I open Action Popover element', () => {
  actionPopoverButton().eq(0).click();
});

When('I open Action Popover element page with iFrame', () => {
  actionPopoverButtonNoIframe().eq(0).click();
});

When('I hit ESC on Action Popover element in iFrame', () => {
  cy.focused().trigger('keydown', { keyCode: 16, which: 16, release: false });
  cy.focused().trigger('keydown', { keyCode: 27, which: 27 });
});

When('I hit Tab on Action Popover element in iFrame', () => {
  cy.focused().trigger('keydown', { keyCode: 9, which: 9 });
});

When('I hit Home on Action Popover element in iFrame', () => {
  cy.focused().trigger('keydown', { keyCode: 36, which: 36 });
});

When('I hit uparrow on Action Popover element in iFrame', () => {
  cy.focused().trigger('keydown', { keyCode: 38, which: 38 });
});

When('I hit End on Action Popover element in iFrame', () => {
  cy.focused().trigger('keydown', { keyCode: 35, which: 35 });
});

When('I hit ShiftTab on Action Popover element in iFrame', () => {
  cy.focused().trigger('keydown', { keyCode: 16, which: 16, release: false });
  cy.focused().trigger('keydown', { keyCode: 9, which: 9 });
});

When('I click on outside dialog in iFrame', () => {
  cy.get('#story-root').click({ force: true });
});

When('I press keyboard {string} key times {int}', (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().type(`${key}`);
  }
});

When('I press keyboard {string} key times {int} on actionPopover open icon', (key, times) => {
  for (let i = 0; i < times; i++) {
    actionPopoverButton().first().type(`${key}`);
  }
});

Then('Action Popover element {word} inner context is set to {string}', (element, text) => {
  cy.focused().should('contain', text);
  cy.focused().should('have.css', 'box-shadow', 'rgb(255, 181, 0) 0px 0px 0px 2px inset');
});

Then('Action Popover element {word} inner context is set to {string} for classic story', (element, text) => {
  cy.focused().should('contain', text);
  cy.focused().should('have.css', 'box-shadow', 'rgb(37, 91, 199) 0px 0px 0px 1px inset');
});

When('I click {int} actionPopoverInnerItem', (element) => {
  actionPopoverInnerItem(element).click();
});

When('I press {string} actionPopoverInnerItem onto {int} element', (key, element) => {
  actionPopoverInnerItem(element).type(`{${key}}`);
});
