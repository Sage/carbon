import { buttonSubtextPreview, buttonDataComponent } from '../../locators/button';
import { commonButtonPreview, icon } from '../../locators';

const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;

Then('Button label on preview is {string}', (label) => {
  commonButtonPreview().should('have.text', label);
});

Then('Button as a sibling label on preview is {string}', (label) => {
  commonButtonPreview().eq(FIRST_ELEMENT).should('have.text', label);
  commonButtonPreview().eq(SECOND_ELEMENT).should('have.text', label);
});

Then('Button is disabled', () => {
  commonButtonPreview().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Button as a sibling is disabled', () => {
  commonButtonPreview().eq(FIRST_ELEMENT).should('be.disabled')
    .and('have.attr', 'disabled');
  commonButtonPreview().eq(SECOND_ELEMENT).should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Button is enabled', () => {
  commonButtonPreview().should('be.enabled');
});

Then('Button as a sibling is enabled', () => {
  commonButtonPreview().eq(FIRST_ELEMENT).should('be.enabled');
  commonButtonPreview().eq(SECOND_ELEMENT).should('be.enabled');
});

Then('Button height is {string} and width is {string}', (height, width) => {
  commonButtonPreview().should('have.css', 'height', `${height}px`);
  commonButtonPreview().should('have.css', 'width', `${width}px`);
});

Then('Button as a sibling height is {string} and width is {string}', (height, width) => {
  commonButtonPreview().eq(FIRST_ELEMENT).should('have.css', 'width', `${width}px`);
  commonButtonPreview().eq(FIRST_ELEMENT).should('have.css', 'height', `${height}px`);
  commonButtonPreview().eq(SECOND_ELEMENT).should('have.css', 'height', `${height}px`);
  commonButtonPreview().eq(SECOND_ELEMENT).should('have.css', 'width', `${width}px`);
});

Then('Button width is {string}', (width) => {
  buttonDataComponent().should('have.css', 'width', width);
});

Then('Button subtext on preview is {string}', (subtext) => {
  buttonSubtextPreview().should('have.text', subtext);
});

Then('Button as a sibling subtext on preview is {string}', (subtext) => {
  buttonSubtextPreview().eq(FIRST_ELEMENT).should('have.text', subtext);
  buttonSubtextPreview().eq(SECOND_ELEMENT).should('have.text', subtext);
});

Then('Button font color is {string}', (color) => {
  commonButtonPreview().should('have.css', 'color', color);
});

Then('Button as a sibling font color is {string}', (color) => {
  commonButtonPreview().eq(FIRST_ELEMENT).should('have.css', 'color', color);
  commonButtonPreview().eq(SECOND_ELEMENT).should('have.css', 'color', color);
});

Then('Button background color is {string}', (color) => {
  commonButtonPreview().should('have.css', 'background-color', color);
});

Then('Button as a sibling background color is {string}', (color) => {
  commonButtonPreview().eq(FIRST_ELEMENT).should('have.css', 'background-color', color);
  commonButtonPreview().eq(SECOND_ELEMENT).should('have.css', 'background-color', color);
});

When('I click on {string}', (element) => {
  buttonDataComponent(element).click();
});

When('I click on {string} as a sibling', (element) => {
  buttonDataComponent(element).eq(FIRST_ELEMENT).click();
  buttonDataComponent(element).eq(SECOND_ELEMENT).click();
});

Then('Button icon is set to {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName);
});

Then('Button as a sibling icon is set to {string}', (iconName) => {
  icon().eq(FIRST_ELEMENT).should('have.attr', 'data-element', iconName);
  icon().eq(SECOND_ELEMENT).should('have.attr', 'data-element', iconName);
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
    icon().eq(FIRST_ELEMENT).should('have.css', 'margin-right', '0px');
    icon().eq(SECOND_ELEMENT).should('have.css', 'margin-right', '0px');
  } else {
    icon().eq(FIRST_ELEMENT).should('have.css', 'margin-right', '8px');
    icon().eq(SECOND_ELEMENT).should('have.css', 'margin-right', '8px');
  }
});
