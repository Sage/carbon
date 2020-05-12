import { inputPrecisionSlider } from '../../locators/decimal/index';
import { setSlidebar } from '../helper';
import { label, commonDataElementInputPreview } from '../../locators';

const TEXT_ALIGN = 'text-align';

Then('input direction is {string}', (direction) => {
  commonDataElementInputPreview().should('have.css', TEXT_ALIGN, `${direction}`);
});

Then('Decimal component is disabled', () => {
  commonDataElementInputPreview().should('have.attr', 'disabled');
  commonDataElementInputPreview().parent().should('have.attr', 'disabled');
});

Then('Decimal component is enabled', () => {
  commonDataElementInputPreview().should('not.have.attr', 'disabled');
  commonDataElementInputPreview().parent().should('not.have.attr', 'disabled');
});

Then('Decimal component is readOnly', () => {
  commonDataElementInputPreview().should('have.attr', 'readonly');
  commonDataElementInputPreview().parent().should('have.attr', 'readonly');
});

Then('Decimal component is not readOnly', () => {
  commonDataElementInputPreview().should('not.have.attr', 'readonly');
  commonDataElementInputPreview().parent().should('not.have.attr', 'readonly');
});

When('label width on preview is {int}', (width) => {
  label().should('have.attr', 'width').should('contain', `${width}`);
});

When('inputWidth on preview is {int}', (width) => {
  commonDataElementInputPreview().parent().should('have.css', 'flex').should('contain', `${width}%`);
});

Then('label align on preview is set to {string}', (labelAlign) => {
  label().should('have.css', TEXT_ALIGN, `${labelAlign}`);
});

When('I set Decimal input to {string}', (labelInput) => {
  commonDataElementInputPreview().clear().type(labelInput);
});

Then('Decimal Input is set to {string}', (labelInput) => {
  commonDataElementInputPreview().should('have.attr', 'value').should('contain', `${labelInput}`);
});

Then('Decimal label is not set to {string}', (labelInput) => {
  commonDataElementInputPreview().should('have.attr', 'value').should('not.contain', `${labelInput}`);
});

When('I set input precision slider to {int}', (precision) => {
  setSlidebar(inputPrecisionSlider(), precision);
});

Then('input precision slider is set to {int}', (precision) => {
  inputPrecisionSlider().should('have.attr', 'value').should('contain', `${precision}`);
});

Then('label is set to inline', () => {
  label().should('have.css', TEXT_ALIGN, 'left');
});
