import {
  checkboxHelpTextPreview, checkboxCommonInputField, checkboxLabelPreview,
} from '../../locators/checkbox';

const CHECKBOX_HELP_TEXT_CLASS_PREFIX = 'carbon-checkbox__help-text--';
const CHECKBOX_LABEL_CLASS_PREFIX = 'common-input__label--';


Then('checkbox helpText property is set to {string}', (property) => {
  checkboxHelpTextPreview().should('have.class', CHECKBOX_HELP_TEXT_CLASS_PREFIX + property);
});

Then('checkbox helpText property is not set to {string}', (property) => {
  checkboxHelpTextPreview().should('not.have.class', CHECKBOX_HELP_TEXT_CLASS_PREFIX + property);
});

Then('checkbox inputWidth is set to {int}', (width) => {
  checkboxCommonInputField().should('have.attr', 'style').should('contain', `width: ${width}%`);
});

Then('Checkbox inputWidth is not set', () => {
  checkboxCommonInputField().should('not.have.attr', 'style');
});

Then('Checkbox label property is set to {string}', (property) => {
  checkboxLabelPreview().should('have.class', CHECKBOX_LABEL_CLASS_PREFIX + property);
});

Then('Checkbox label property is not set to {string}', (property) => {
  checkboxLabelPreview().should('not.have.class', CHECKBOX_LABEL_CLASS_PREFIX + property);
});

Then('Checkbox label width is set to {int}', (width) => {
  checkboxLabelPreview().should('have.attr', 'style').should('contain', `width: ${width}%`);
});

Then('Checkbox label width is not set', () => {
  checkboxLabelPreview().should('not.have.attr', 'style');
});
