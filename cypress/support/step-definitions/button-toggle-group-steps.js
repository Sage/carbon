import { labelPreviewWidth, labelPreviewByTextIFrame, labelPreviewWidthIFrame } from '../../locators/button-toggle-group';
import { getDataElementByValue } from '../../locators';

Then('Button Toggle Group label on preview is {word}', (text) => {
  getDataElementByValue('label').should('have.text', text);
});

Then('Button Toggle Group component has label-inline property', () => {
  getDataElementByValue('label').parent().should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'justify-content', 'flex-start');
});

Then('Button Toggle Group component does not have label-inline property', () => {
  getDataElementByValue('label').should('not.have.css', 'align-self', 'center')
    .and('not.have.css', 'text-align', 'left');
});

Then('label width is not set {string}', (width) => {
  getDataElementByValue('label').should('not.have.css', 'width', `${width}px`);
});

Then('input width is set to {string}', (width) => {
  labelPreviewWidthIFrame().should($element => expect($element).to.have.css('width', `${width}px`));
});

Then('input width is not set to {string}', (width) => {
  labelPreviewWidth().should('not.have.css', `width: ${width}%`);
});

When('I click on Button Toggle Group {string}', (buttonName) => {
  labelPreviewByTextIFrame().contains(buttonName).click();
});
