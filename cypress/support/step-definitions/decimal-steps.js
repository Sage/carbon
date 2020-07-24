import { inputPrecisionSlider } from '../../locators/decimal/index';
import { setSlidebar } from '../helper';
import { label, commonDataElementInputPreviewNoIframe, getDataElementByValueNoIframe } from '../../locators';

const TEXT_ALIGN = 'text-align';

Then('input direction is {string}', (direction) => {
  commonDataElementInputPreviewNoIframe().should('have.css', TEXT_ALIGN, `${direction}`);
});

Then('Decimal component is disabled', () => {
  commonDataElementInputPreviewNoIframe().should('have.attr', 'disabled');
  commonDataElementInputPreviewNoIframe().parent().should('have.attr', 'disabled');
});

Then('Decimal component is enabled', () => {
  commonDataElementInputPreviewNoIframe().should('not.have.attr', 'disabled');
  commonDataElementInputPreviewNoIframe().parent().should('not.have.attr', 'disabled');
});

Then('Decimal component is readOnly', () => {
  commonDataElementInputPreviewNoIframe().should('have.attr', 'readonly');
  commonDataElementInputPreviewNoIframe().parent().should('have.attr', 'readonly');
});

Then('Decimal component is not readOnly', () => {
  commonDataElementInputPreviewNoIframe().should('not.have.attr', 'readonly');
  commonDataElementInputPreviewNoIframe().parent().should('not.have.attr', 'readonly');
});

Then('label width on preview is {int}', (width) => {
  getDataElementByValueNoIframe('label').should('have.attr', 'width').should('contain', `${width}`);
});

Then('inputWidth on preview is {int}', (width) => {
  commonDataElementInputPreviewNoIframe().parent().should('have.css', 'flex').should('contain', `${width}%`);
});

Then('label align on preview is set to {string}', (labelAlign) => {
  getDataElementByValueNoIframe('label').should('have.css', TEXT_ALIGN, `${labelAlign}`);
});

When('I set Decimal input to {word}', (labelInput) => {
  commonDataElementInputPreviewNoIframe().clear().type(labelInput);
});

Then('Decimal Input is set to {word}', (labelInput) => {
  commonDataElementInputPreviewNoIframe().should('have.attr', 'value').should('contain', `${labelInput}`);
});

Then('Decimal input is not set to {word}', (labelInput) => {
  commonDataElementInputPreviewNoIframe().should('have.attr', 'value').should('not.contain', `${labelInput}`);
});

Then('label is inline', () => {
  getDataElementByValueNoIframe('label').should('have.css', TEXT_ALIGN, 'left');
});
