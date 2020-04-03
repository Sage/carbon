import { buttonSubtextPreview, buttonDataComponent } from '../../locators/button';
import { icon } from '../../locators';

const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;

Then('Button label on preview is {string}', (label) => {
  buttonDataComponent().should('have.text', label);
});

Then('Button as a sibling label on preview is {string}', (label) => {
  buttonDataComponent().eq(FIRST_ELEMENT).should('have.text', label);
  buttonDataComponent().eq(SECOND_ELEMENT).should('have.text', label);
});

Then('Button is disabled', () => {
  buttonDataComponent().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Button as a sibling is disabled', () => {
  buttonDataComponent().eq(FIRST_ELEMENT).should('be.disabled')
    .and('have.attr', 'disabled');
  buttonDataComponent().eq(SECOND_ELEMENT).should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Button is enabled', () => {
  buttonDataComponent().should('be.enabled');
});

Then('Button as a sibling is enabled', () => {
  buttonDataComponent().eq(FIRST_ELEMENT).should('be.enabled');
  buttonDataComponent().eq(SECOND_ELEMENT).should('be.enabled');
});

Then('Button height is {string}', (height) => {
  buttonDataComponent().should('have.css', 'height', `${height}px`);
});

Then('Button as a sibling height is {string}', (height) => {
  buttonDataComponent().eq(FIRST_ELEMENT).should('have.css', 'height', `${height}px`);
  buttonDataComponent().eq(SECOND_ELEMENT).should('have.css', 'height', `${height}px`);
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
  buttonDataComponent().should('have.css', 'color', color);
});

Then('Button as a sibling font color is {string}', (color) => {
  buttonDataComponent().eq(FIRST_ELEMENT).should('have.css', 'color', color);
  buttonDataComponent().eq(SECOND_ELEMENT).should('have.css', 'color', color);
});

Then('Button background color is {string}', (color) => {
  buttonDataComponent().should('have.css', 'background-color', color);
});

Then('Button as a sibling background color is {string}', (color) => {
  buttonDataComponent().eq(FIRST_ELEMENT).should('have.css', 'background-color', color);
  buttonDataComponent().eq(SECOND_ELEMENT).should('have.css', 'background-color', color);
});

When('I click on {string}', (element) => {
  buttonDataComponent(element).click();
});

When('I click on {string} as a sibling', (element) => {
  buttonDataComponent(element).eq(FIRST_ELEMENT).click();
  buttonDataComponent(element).eq(SECOND_ELEMENT).click();
});

Then('Button icon is set to {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName)
    .and('be.visible');
});

Then('Button as a sibling icon is set to {string}', (iconName) => {
  icon().eq(FIRST_ELEMENT).should('have.attr', 'data-element', iconName)
    .and('be.visible');
  icon().eq(SECOND_ELEMENT).should('have.attr', 'data-element', iconName)
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
    icon().eq(FIRST_ELEMENT).should('have.css', 'margin-right', '0px');
    icon().eq(SECOND_ELEMENT).should('have.css', 'margin-right', '0px');
  } else {
    icon().eq(FIRST_ELEMENT).should('have.css', 'margin-right', '8px');
    icon().eq(SECOND_ELEMENT).should('have.css', 'margin-right', '8px');
  }
});
