import { labelPreview, fieldHelpPreview } from '../../locators';
import { buttonToggleGroupPreview, labelWidthInput } from '../../locators/button-toggle-group';

Then('Button Toggle Group component has label-inline property', () => {
  buttonToggleGroupPreview().should('have.class', 'common-input--label-inline');
  labelPreview().should('have.class', 'common-input__label--inline');
  fieldHelpPreview().should('have.class', 'common-input__help-text--inline');
});

Then('Button Toggle Group component do not have label-inline property', () => {
  buttonToggleGroupPreview().should('not.have.class', 'common-input--label-inline');
  labelPreview().should('not.have.class', 'common-input__label--inline');
  fieldHelpPreview().should('not.have.class', 'common-input__help-text--inline');
});

When('I set label width to {string}', (width) => {
  labelWidthInput().clear().type(width);
});

Then('Label width is set to {string}', (width) => {
  labelPreview().should('have.attr', 'style').should('contain', `width: ${width}%`);
});

Then('Label width is not set', () => {
  labelPreview().should('not.have.attr', 'style');
});
