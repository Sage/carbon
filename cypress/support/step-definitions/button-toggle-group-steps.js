import { buttonToggleGroupLabelPreview, labelPreviewWidth, labelPreviewByText } from '../../locators/button-toggle-group';
import { label } from '../../locators';

const TEXT_ALIGN = 'text-align';

Then('Button Toggle Group label on preview is {string}', (text) => {
  buttonToggleGroupLabelPreview().should('have.text', text);
});

Then('Button Toggle Group component has label-inline property', () => {
  label().should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'text-align', 'left');
});

Then('Button Toggle Group component does not have label-inline property', () => {
  label().should('not.have.css', 'align-self', 'center')
    .and('not.have.css', 'text-align', 'left');
});

Then('label width is set to {string}', (width) => {
  label().should('have.attr', 'width', `${width}`);
});

Then('label width is not set {string}', (width) => {
  label($element => expect($element).to.not.have.css('width', `${width}px`));
});

Then('input width is set to {string}', (width) => {
  labelPreviewWidth().should($element => expect($element).to.have.css('width', `${width}px`));
});

Then('input width is not set to {string}', (width) => {
  labelPreviewWidth().should('not.have.css', `width: ${width}%`);
});

Then('label Align on preview is {string}', (direction) => {
  label().should($element => expect($element).to.have.css(TEXT_ALIGN, `${direction}`));
});

When('I click on Button Toggle Group {string}', (buttonName) => {
  labelPreviewByText().contains(buttonName).click();
});
