import { buttonToggleLabelPreview, buttonTogglePreview } from '../../locators/button-toggle';
import { icon } from '../../locators';

const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;
const THIRD_ELEMENT = 2;

Then('Button Toggle label on preview is {string}', (label) => {
  buttonToggleLabelPreview(FIRST_ELEMENT).should('have.text', label);
  buttonToggleLabelPreview(SECOND_ELEMENT).should('have.text', label);
  buttonToggleLabelPreview(THIRD_ELEMENT).should('have.text', label);
});

Then('Button icon on preview is {string}', (iconName) => {
  icon().eq(FIRST_ELEMENT).should('have.attr', 'data-element', iconName);
  icon().eq(SECOND_ELEMENT).should('have.attr', 'data-element', iconName);
  icon().eq(THIRD_ELEMENT).should('have.attr', 'data-element', iconName);
});

Then('Button Toggle icon is set to {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName);
});

Then('Button Toggle icon height is {string} and width is {string}', (height, width) => {
  icon().eq(FIRST_ELEMENT).should('have.css', 'height', height);
  icon().eq(FIRST_ELEMENT).should('have.css', 'width', width);
  icon().eq(SECOND_ELEMENT).should('have.css', 'height', height);
  icon().eq(SECOND_ELEMENT).should('have.css', 'width', width);
  icon().eq(THIRD_ELEMENT).should('have.css', 'height', height);
  icon().eq(THIRD_ELEMENT).should('have.css', 'width', width);
});

Then('Button icon not exists on preview', () => {
  icon().should('not.exist');
});

Then('Button Toggle height is {string} and width is {string}', (height, width) => {
  buttonTogglePreview().eq(FIRST_ELEMENT).should('have.css', 'height', `${height}px`);
  buttonTogglePreview().eq(FIRST_ELEMENT).should('have.css', 'width', `${width}px`);
  buttonTogglePreview().eq(SECOND_ELEMENT).should('have.css', 'height', `${height}px`);
  buttonTogglePreview().eq(SECOND_ELEMENT).should('have.css', 'width', `${width}px`);
  buttonTogglePreview().eq(THIRD_ELEMENT).should('have.css', 'height', `${height}px`);
  buttonTogglePreview().eq(THIRD_ELEMENT).should('have.css', 'width', `${width}px`);
});

Then('Button Toggle is disabled', () => {
  buttonTogglePreview().eq(FIRST_ELEMENT).children().should('have.attr', 'disabled');
  buttonTogglePreview().eq(SECOND_ELEMENT).children().should('have.attr', 'disabled');
  buttonTogglePreview().eq(THIRD_ELEMENT).children().should('have.attr', 'disabled');
});

Then('Button Toggle is enabled', () => {
  buttonTogglePreview().eq(FIRST_ELEMENT).children().should('not.have.attr', 'disabled');
  buttonTogglePreview().eq(SECOND_ELEMENT).children().should('not.have.attr', 'disabled');
  buttonTogglePreview().eq(THIRD_ELEMENT).children().should('not.have.attr', 'disabled');
});

Then('Button Toggle is grouped', () => {
  buttonTogglePreview().eq(FIRST_ELEMENT).should('have.css', 'display', 'inline-block');
  buttonTogglePreview().eq(FIRST_ELEMENT).should('have.css', 'vertical-align', 'middle');
  buttonTogglePreview().eq(SECOND_ELEMENT).should('have.css', 'margin-left', '0px');
  buttonTogglePreview().eq(THIRD_ELEMENT).should('have.css', 'margin-left', '0px');
});

Then('Button Toggle is not grouped', () => {
  buttonTogglePreview().eq(FIRST_ELEMENT).should('have.css', 'display', 'inline-block');
  buttonTogglePreview().eq(FIRST_ELEMENT).should('have.css', 'vertical-align', 'middle');
  buttonTogglePreview().eq(SECOND_ELEMENT).should('have.css', 'margin-left', '10px');
  buttonTogglePreview().eq(THIRD_ELEMENT).should('have.css', 'margin-left', '10px');
});
