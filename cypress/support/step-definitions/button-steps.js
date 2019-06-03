import { buttonSubtextPreview } from '../../locators/button';
import { commonButtonPreview } from '../../locators';

Then('Button label on preview is {string}', (label) => {
  commonButtonPreview().should('have.text', label);
});

Then('Button is disabled', () => {
  commonButtonPreview().should('be.disabled');
});

Then('Button is enabled', () => {
  commonButtonPreview().should('be.enabled');
});

Then('Button height is {string}', (height) => {
  commonButtonPreview().should('have.css', 'height', height);
});

Then('Button width is {string}', (width) => {
  commonButtonPreview().should('have.css', 'width', width);
});

Then('Button subtext on preview is {string}', (subtext) => {
  buttonSubtextPreview().should('have.text', subtext);
});

Then('Button font color is {string}', (color) => {
  commonButtonPreview().should('have.css', 'color', color);
});

Then('Button background color is {string}', (color) => {
  commonButtonPreview().should('have.css', 'background-color', color);
});
