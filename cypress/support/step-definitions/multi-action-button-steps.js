import {
  multiActionButtonList, multiActionButtonText, multiActionButton,
  multiActionButtonComponent,
} from '../../locators/multi-action-button';
import { buttonSubtextPreview } from '../../locators/button';

const MULTI_ACTION_BUTTON_INNER_TEXT = 'Example ButtonExample Button with long textShort';
const TEXT_ALIGN = 'text-align';

Then('Multi Action Button text on preview is set to {string}', (text) => {
  multiActionButtonText().should('have.text', text);
});

Then('Multi Action Button state is disabled', () => {
  multiActionButton().should('have.attr', 'disabled');
});

Then('Multi Action Button state is not disabled', () => {
  multiActionButton().should('not.have.attr', 'disabled');
});

Then('Multi Action Button has {string} background-color', (color) => {
  multiActionButton().should('have.css', 'background-color', color);
});

Then('Multi Action Button border color is {string} border-color', (borderColor) => {
  multiActionButton().should('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-top-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-left-color', borderColor);
});

Then('Multi Action Button height is {string}', (height) => {
  multiActionButton().should('have.css', 'height', `${height}px`);
});

Then('Multi Action Button align on preview is {string}', (align) => {
  multiActionButtonList().children()
    .should('have.css', TEXT_ALIGN, `${align}`);
});

Then('Multi Action Button subtext on preview is {string}', (subtext) => {
  buttonSubtextPreview().should('have.text', subtext);
});

Then('Multi Action Button has golden border color', () => {
  multiActionButtonComponent().should('have.css', 'border', 'rgb(255, 181, 0) solid 3px');
});

When('I hover on Multi Action Button', () => {
  multiActionButtonComponent().trigger('mouseover');
});

When('I click the Multi Action Button', () => {
  multiActionButtonComponent().click();
});

Then('Multi Action Button is expanded and contains three items', () => {
  multiActionButtonList().should('have.length', 3);
  multiActionButtonList().invoke('text').should('contain', MULTI_ACTION_BUTTON_INNER_TEXT);
});
