import {
  buttonSubtextPreview,
  buttonDataComponent,
  buttonDataComponentIFrame, 
  buttonSubtextPreviewIframe,
} from '../../locators/button';
import { icon } from '../../locators';
import { positionOfElement } from '../helper';

Then('Button label on preview is {word}', (label) => {
  buttonDataComponent().should('have.text', label);
});

Then('Button label on preview is {word} in IFrame', (label) => {
  buttonDataComponentIFrame().should('have.text', label);
});

Then('Button as a sibling label on preview is {word}', (label) => {
  buttonDataComponentIFrame().eq(positionOfElement('first')).should('have.text', label);
  buttonDataComponentIFrame().eq(positionOfElement('second')).should('have.text', label);
});

Then('Button is disabled', () => {
  buttonDataComponentIFrame().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Button as a sibling is disabled', () => {
  buttonDataComponentIFrame().eq(positionOfElement('first')).should('be.disabled')
    .and('have.attr', 'disabled');
  buttonDataComponentIFrame().eq(positionOfElement('second')).should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Button is enabled', () => {
  buttonDataComponentIFrame().should('be.enabled');
});

Then('Button as a sibling is enabled', () => {
  buttonDataComponentIFrame().eq(positionOfElement('first')).should('be.enabled');
  buttonDataComponentIFrame().eq(positionOfElement('second')).should('be.enabled');
});

Then('Button height is {string}', (height) => {
  buttonDataComponentIFrame().should('have.css', 'height', `${height}px`);
});

Then('Button as a sibling height is {string}', (height) => {
  buttonDataComponentIFrame().eq(positionOfElement('first')).should('have.css', 'height', `${height}px`);
  buttonDataComponentIFrame().eq(positionOfElement('second')).should('have.css', 'height', `${height}px`);
});

Then('Button width is {string}', (width) => {
  buttonDataComponentIFrame().should('have.css', 'width', width);
});

Then('Button subtext on preview is {word}', (subtext) => {
  buttonSubtextPreview().should('have.text', subtext);
});

Then('Button subtext on preview is {word} in IFrame', (subtext) => {
  buttonSubtextPreviewIframe().should('have.text', subtext);
});

Then('Button as a sibling subtext on preview is {word}', (subtext) => {
  buttonSubtextPreviewIframe().eq(positionOfElement('first')).should('have.text', subtext);
  buttonSubtextPreviewIframe().eq(positionOfElement('second')).should('have.text', subtext);
});

Then('Button font color is {string}', (color) => {
  buttonDataComponentIFrame().should('have.css', 'color', color);
});

Then('Button as a sibling font color is {string}', (color) => {
  buttonDataComponentIFrame().eq(positionOfElement('first')).should('have.css', 'color', color);
  buttonDataComponentIFrame().eq(positionOfElement('second')).should('have.css', 'color', color);
});

Then('Button background color is {string}', (color) => {
  buttonDataComponentIFrame().should('have.css', 'background-color', color);
});

Then('Button background style is {string}', (style) => {
  buttonDataComponentIFrame().should('have.css', 'border-style', style);
});

Then('Button as a sibling background color is {string}', (color) => {
  buttonDataComponentIFrame().eq(positionOfElement('first')).should('have.css', 'background-color', color);
  buttonDataComponentIFrame().eq(positionOfElement('second')).should('have.css', 'background-color', color);
});

When('I click on {string}', (element) => {
  buttonDataComponentIFrame(element).click();
});

When('I click on {string} as a sibling', (element) => {
  buttonDataComponentIFrame(element).eq(positionOfElement('first')).click();
  buttonDataComponentIFrame(element).eq(positionOfElement('second')).click();
});

Then('Button icon is set to {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName)
    .and('be.visible');
});

Then('Button as a sibling icon is set to {string}', (iconName) => {
  icon().eq(positionOfElement('first')).should('have.attr', 'data-element', iconName)
    .and('be.visible');
  icon().eq(positionOfElement('second')).should('have.attr', 'data-element', iconName)
    .and('be.visible');
});

Then('Button icon position is set to {string}', (iconPosition) => {
  if (iconPosition === 'after') {
    icon().should('have.css', 'margin-right', '0px');
  } else {
    icon().should('have.css', 'margin-right', '8px');
  }
});

Then('Button as a sibling icon position is set to {string}', (iconPosition) => {
  if (iconPosition === 'after') {
    icon().eq(positionOfElement('first')).should('have.css', 'margin-right', '0px');
    icon().eq(positionOfElement('second')).should('have.css', 'margin-right', '0px');
  } else {
    icon().eq(positionOfElement('first')).should('have.css', 'margin-right', '8px');
    icon().eq(positionOfElement('second')).should('have.css', 'margin-right', '8px');
  }
});
