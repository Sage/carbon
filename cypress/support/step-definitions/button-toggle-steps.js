import { buttonToggleLabelPreview, buttonTogglePreview } from '../../locators/button-toggle';
import { icon } from '../../locators';

Then('Button Toggle label on preview is {string}', (label) => {
  buttonToggleLabelPreview().should('have.text', label);
});

Then('Button icon on preview is {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName);
});

Then('Button icon height is {string} and width is {string}', (height, width) => {
  icon().should('have.css', 'height', height);
  icon().should('have.css', 'width', width);
});

Then('Button icon not exists on preview', () => {
  icon().should('not.exist');
});

Then('Button Toggle height is {string} and width is {string}', (height, width) => {
  buttonTogglePreview().should('have.css', 'height', height);
  buttonTogglePreview().should('have.css', 'width', width);
});

Then('Button Toggle is disabled', () => {
  buttonTogglePreview().should('have.attr', 'disabled');
});

Then('Button Toggle is enabled', () => {
  buttonTogglePreview().should('not.have.attr', 'disabled');
});

Then('Button Toggle is grouped', () => {
  buttonTogglePreview().should('have.css', 'margin-left', '0px');
});

Then('Button Toggle is not grouped', () => {
  buttonTogglePreview().should('have.css', 'margin-left', '10px');
});
