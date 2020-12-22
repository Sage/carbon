import {
  multiActionButtonList, multiActionButtonText, multiActionButton,
  multiActionButtonComponent,
} from '../../locators/multi-action-button';
import { buttonSubtextPreview } from '../../locators/button';

const MULTI_ACTION_BUTTON_INNER_TEXT = 'Example ButtonExample Button with long textShort';

Then('Multi Action Button text on preview is set to {word}', (text) => {
  multiActionButtonText().should('have.text', text);
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

Then('Multi Action Button subtext on preview is {word}', (subtext) => {
  buttonSubtextPreview().should('have.text', subtext);
});

Then('Multi Action Button has golden border color', () => {
  multiActionButtonComponent().should('have.css', 'border', 'rgb(255, 181, 0) solid 3px');
});

When('I hover on Multi Action Button', () => {
  multiActionButtonComponent().trigger('mouseover');
});

Then('Multi Action Button is expanded and contains three items', () => {
  multiActionButtonList().should('have.length', 3);
  multiActionButtonList().invoke('text').should('contain', MULTI_ACTION_BUTTON_INNER_TEXT);
});
