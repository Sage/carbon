import {
  popoverContainerContentDS,
  popoverContainerTitle,
  popoverContainerContentSecondInnerElement,
  popoverSettingsIconBasicDS,
  popoverCloseIconDS,
  popoverSettingsIconRightAlignedDS,
  popoverSettingsIconCoverDS,
  popoverContainerDataComponent,
  popoverSettingsIconNoIFrame,
} from '../../locators/popover-container';
import { keyCode } from '../helper';

When('I open popover container in basic component', () => {
  popoverSettingsIconBasicDS().click();
});

When('I open popover container', () => {
  popoverContainerDataComponent().click();
});

When('I open popover container in open component', () => {
  popoverSettingsIconCoverDS().click();
});

Then('Popover container is visible', () => {
  popoverContainerContentDS().should('exist');
  popoverSettingsIconBasicDS().should('exist');
  popoverContainerContentDS().should('be.visible');
  popoverContainerContentDS().should('have.css', 'background-color', 'rgb(255, 255, 255)')
    .and('have.css', 'box-shadow', 'rgba(0, 20, 29, 0.2) 0px 5px 5px 0px, rgba(0, 20, 29, 0.1) 0px 10px 10px 0px')
    .and('have.css', 'padding', '16px 24px')
    .and('have.css', 'min-width', '300px')
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'left', '0px')
    .and('have.css', 'opacity', '1');
  popoverContainerContentSecondInnerElement().should('have.attr', 'data-element', 'popover-container-close-component')
    .and('be.visible')
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'top', '16px')
    .and('have.css', 'right', '24px')
    .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border', '0px none rgba(0, 0, 0, 0.9)')
    .and('have.css', 'padding', '0px');
  popoverContainerContentSecondInnerElement().children().should('have.attr', 'data-element', 'close').and('be.visible')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.9)')
    .and('have.css', 'position', 'relative');
});

Then('Popover title on preview is set to {word}', (title) => {
  popoverContainerTitle().should('have.text', title);
});

Then('opening icon is on the {string} side', (side) => {
  if (side === 'left') {
    popoverSettingsIconBasicDS().parent().should('not.have.css', 'float', 'right');
  } else {
    popoverSettingsIconRightAlignedDS().parent().should('have.css', 'float', 'right');
    popoverSettingsIconRightAlignedDS().children().should('have.attr', 'aria-label', 'Right Aligned');
  }
});

Then('Popover component is opened the {string} side', (side) => {
  if (side === 'left') {
    popoverSettingsIconBasicDS().click();
    popoverSettingsIconBasicDS().should('have.css', 'right', '0px');
  } else {
    popoverSettingsIconRightAlignedDS().click();
    popoverSettingsIconRightAlignedDS().should('have.css', 'right', '0px');
  }
});

Then('Popover container is not visible', () => {
  popoverContainerContentDS().should('not.exist');
});

When('I click onto popover setting icon using {string} key', (key) => {
  popoverSettingsIconBasicDS().trigger('keydown', keyCode(key));
});

Then('I press onto closeIcon using {string} key', (key) => {
  popoverCloseIconDS().trigger('keydown', keyCode(key));
});

When('I click popover close icon', () => {
  popoverCloseIconDS().click();
});

Then('opening icon is hide', () => {
  popoverSettingsIconCoverDS().parent().should('have.attr', 'tabindex', '-1');
  popoverContainerContentDS().should('be.visible');
});

When('I open popover container in NoIFrame', () => {
  popoverSettingsIconNoIFrame().click();
});
