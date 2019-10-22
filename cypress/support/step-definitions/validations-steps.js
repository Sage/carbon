import { commonButtonPreviewNoIframe } from '../../locators/build';
import { roleTooltipNoIframe } from '../../locators/validations';

When('I click {string} button into iFrame', (text) => {
  commonButtonPreviewNoIframe().contains(text).click();
});

Then('tooltipPreview on preview for validations component into iFrame is set to {string}', (text) => {
  roleTooltipNoIframe().should('have.text', text);
});
