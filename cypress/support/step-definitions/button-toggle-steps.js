import { buttonToggleLabelPreview, buttonTogglePreview } from '../../locators/button-toggle';
import { icon } from '../../locators';
import { positionOfElement } from '../helper';

Then('Button Toggle label on preview is {string}', (label) => {
  buttonToggleLabelPreview(positionOfElement('first')).should('have.text', label);
  buttonToggleLabelPreview(positionOfElement('second')).should('have.text', label);
  buttonToggleLabelPreview(positionOfElement('third')).should('have.text', label);
});

Then('Button icon on preview is {string}', (iconName) => {
  icon().eq(positionOfElement('first')).should('have.attr', 'data-element', iconName)
    .and('be.visible');
  icon().eq(positionOfElement('second')).should('have.attr', 'data-element', iconName)
    .and('be.visible');
  icon().eq(positionOfElement('third')).should('have.attr', 'data-element', iconName)
    .and('be.visible');
});

Then('Button Toggle icon is set to {string}', (iconName) => {
  icon().should('have.attr', 'data-element', iconName);
});

Then('Button Toggle icon height is {string} and width is {string}', (height, width) => {
  icon().eq(positionOfElement('first')).should('have.css', 'height', height)
    .and('have.css', 'width', width);
  icon().eq(positionOfElement('second')).should('have.css', 'height', height)
    .and('have.css', 'width', width);
  icon().eq(positionOfElement('third')).should('have.css', 'height', height)
    .and('have.css', 'width', width);
});

Then('Button icon not exists on preview', () => {
  icon().should('not.exist');
});

Then('Button Toggle height is {string} and width is {string}', (height, width) => {
  buttonTogglePreview().eq(positionOfElement('first')).should('have.css', 'height', `${height}px`)
    .and('have.css', 'width', `${width}px`);
  buttonTogglePreview().eq(positionOfElement('second')).should('have.css', 'height', `${height}px`)
    .and('have.css', 'width', `${width}px`);
  buttonTogglePreview().eq(positionOfElement('third')).should('have.css', 'height', `${height}px`)
    .and('have.css', 'width', `${width}px`);
});

Then('Button Toggle is disabled', () => {
  buttonTogglePreview().eq(positionOfElement('first')).children().should('have.attr', 'disabled');
  buttonTogglePreview().eq(positionOfElement('second')).children().should('have.attr', 'disabled');
  buttonTogglePreview().eq(positionOfElement('third')).children().should('have.attr', 'disabled');
});

Then('Button Toggle is enabled', () => {
  buttonTogglePreview().eq(positionOfElement('first')).children().should('not.have.attr', 'disabled');
  buttonTogglePreview().eq(positionOfElement('second')).children().should('not.have.attr', 'disabled');
  buttonTogglePreview().eq(positionOfElement('third')).children().should('not.have.attr', 'disabled');
});

Then('Button Toggle is grouped', () => {
  buttonTogglePreview().eq(positionOfElement('first')).should('have.css', 'display', 'inline-block')
    .and('have.css', 'vertical-align', 'middle');
  buttonTogglePreview().eq(positionOfElement('second')).should('have.css', 'margin-left', '0px');
  buttonTogglePreview().eq(positionOfElement('third')).should('have.css', 'margin-left', '0px');
});

Then('Button Toggle is not grouped', () => {
  buttonTogglePreview().eq(positionOfElement('first')).should('have.css', 'display', 'inline-block')
    .and('have.css', 'vertical-align', 'middle');
  buttonTogglePreview().eq(positionOfElement('second')).should('have.css', 'margin-left', '10px');
  buttonTogglePreview().eq(positionOfElement('third')).should('have.css', 'margin-left', '10px');
});

When('I click on Button Toggle {int}', (index) => {
  buttonTogglePreview().eq(index).click();
});
