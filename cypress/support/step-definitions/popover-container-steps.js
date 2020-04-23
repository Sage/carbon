import {
  popoverContainerDataComponent,
  popoverContainerContent,
  popoverContainerTitle,
  popoverContainerContentFirstInnerElement,
  popoverContainerContentSecondInnerElement,
  popoverSettingsIcon,
  popoverCloseIcon,
} from '../../locators/popover-container';
import { keyCode } from '../helper';

When('I open popover container', () => {
  popoverContainerDataComponent().click();
});

Then('Popover container is visible', () => {
  popoverContainerDataComponent().should('exist');
  popoverSettingsIcon().should('exist');
  popoverContainerContent().children().children().should('have.length', 2);
  popoverContainerContent().should('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'box-shadow', 'rgba(0, 20, 29, 0.2) 0px 5px 5px 0px, rgba(0, 20, 29, 0.1) 0px 10px 10px 0px')
    .and('have.css', 'padding', '16px 24px')
    .and('have.css', 'min-width', '300px')
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'top', '0px')
    .and('have.css', 'opacity', '1')
    .and('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)')
    .and('have.css', 'transition', 'all 0.3s cubic-bezier(0.25, 0.25, 0, 1.5) 0s')
    .and('be.visible');
  popoverContainerContentFirstInnerElement().should('have.attr', 'data-element', 'popover-container-title').and('be.visible')
    .and('have.css', 'font-size', '16px')
    .and('have.css', 'font-weight', '700');
  popoverContainerContentSecondInnerElement().should('have.attr', 'data-element', 'popover-container-close-icon')
    .and('be.visible')
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'margin-right', '0px')
    .and('have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '0px none rgba(0, 0, 0, 0.9)')
    .and('have.css', 'padding', '0px');
  popoverContainerContentSecondInnerElement().children().should('have.attr', 'data-element', 'close').and('be.visible')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.9)')
    .and('have.css', 'position', 'relative');
});

Then('Popover title on preview is set to {string}', (title) => {
  popoverContainerTitle().should('have.text', title);
});

Then('Popover component opened the {string} side', (side) => {
  if (side === 'left') {
    popoverContainerDataComponent().parent().should('have.attr', 'style').should('contain', 'margin-left', '400px');
    popoverContainerContent().should('have.css', 'right', '0px');
  } else {
    popoverContainerDataComponent().parent().should('not.have.attr', 'style');
    popoverContainerContent().should('have.css', 'left', '0px');
  }
});

Then('Popover container is not visible', () => {
  popoverContainerContent().should('not.exist');
});

When('I click onto popover setting icon using {string} key', (key) => {
  popoverSettingsIcon().trigger('keydown', keyCode(key));
});

Then('I press onto closeIcon using {string} key', (key) => {
  popoverCloseIcon().trigger('keydown', keyCode(key));
});

When('I click popover close icon', () => {
  popoverCloseIcon().click();
});
