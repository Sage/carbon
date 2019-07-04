import { fieldHelpPreview } from '../../locators';
import { tooltipRadioButton } from '../../locators/radio-button';

const INLINE = 'carbon-radio-button__help-text--inline';

Then('fieldHelpInline is enabled', () => {
  fieldHelpPreview().should('have.class', INLINE);
});

Then('fieldHelpInline is disabled', () => {
  fieldHelpPreview().should('not.have.class', INLINE);
});

Then('RadioButton tooltipPreview on preview is set to {string}', (text) => {
  tooltipRadioButton().should('have.text', text);
});
