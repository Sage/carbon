// import { labelPreview, fieldHelpPreview } from '../../locators';
import { buttonToggleGroupPreview, labelPreviewWidth } from '../../locators/button-toggle-group';

const TEXT_ALIGN = 'text-align';

Then('Button Toggle Group component has label-inline property', () => {
  buttonToggleGroupPreview().should('have.css', 'alignSelf', 'center');
  buttonToggleGroupPreview().should('have.css', 'text-align', 'left');
});

Then('Button Toggle Group component do not have label-inline property', () => {
  buttonToggleGroupPreview().should('not.have.css', 'alignSelf', 'center');
  buttonToggleGroupPreview().should('not.have.css', 'text-align', 'left');
});

Then('label width is set to {string}', (width) => {
  buttonToggleGroupPreview().should('have.attr', 'width', `${width}`);
});

Then('label width is not set', () => {
  buttonToggleGroupPreview().should('have.attr', 'width');
});

Then('input width is set to {string}', (width) => {
  labelPreviewWidth().should($element => expect($element).to.have.css('width', `${width}px`));
});

Then('input width is not set to {string}', (width) => {
  labelPreviewWidth().should('not.have.css', `width: ${width}%`);
});

Then('label Align on preview is {string}', (direction) => {
  buttonToggleGroupPreview().should($element => expect($element).to.have.css(TEXT_ALIGN, `${direction}`));
});
