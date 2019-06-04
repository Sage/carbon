import { fieldHelpPreview } from '../../locators';

const INLINE = 'carbon-radio-button__help-text--inline';

Then('fieldHelpInline is enabled', () => {
  fieldHelpPreview().should('have.class', INLINE);
});

Then('fieldHelpInline is disabled', () => {
  fieldHelpPreview().should('not.have.class', INLINE);
});
