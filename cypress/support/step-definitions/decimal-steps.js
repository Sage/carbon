import {
  alignSelect, labelPreview, helpIcon, label, inputPrecisionSlider,
} from '../../locators/decimal/index';
import { setSlidebar } from '../helper';

const TEXT_ALIGN = 'text-align';

When('I set input align {string}', (direction) => {
  alignSelect().select(direction);
});

Then('input direction is {string}', (direction) => {
  labelPreview().children('input').should('have.css', TEXT_ALIGN, `${direction}`);
});

Then('Decimal component is disabled', () => {
  dropdownInputPreview().should('be.disabled');
});

Then('Decimal component is enabled', () => {
  dropdownInputPreview().should('not.be.disabled');
});

Then('Decimal component is readOnly', () => {
  dropdownInputPreview().should('be.readOnly');
});

Then('Decimal component is readOnly', () => {
  dropdownComponentPreview().should('have.class', 'common-input--readonly');
});

Then('Decimal component is not readOnly', () => {
  dropdownComponentPreview().should('not.have.class', 'common-input--readonly');
});

When('I hover mouse onto help icon', () => {
  helpIcon().trigger('mouseover');
});

When('labelWidth on preview is {int}', (width) => {
  label().should('have.attr', 'width').should('contain', `${width}`);
});

When('inputWidth on preview is {int}', (width) => {
  labelPreview().should('have.css', 'flex').should('contain', `${width}`);
});

Then('labelAlign on preview is set to {string}', (labelAlign) => {
  label().should('have.css', TEXT_ALIGN, `${labelAlign}`);
});

When('I set labelInput to {string}', (labelInput) => {
  labelPreview().children().clear().type(labelInput);
});

Then('Decimal labelInput is set to {string}', (labelInput) => {
  labelPreview().children().should('have.attr', 'value').should('contain', `${labelInput}`);
});

Then('Decimal labelInput is not set to {string}', (labelInput) => {
  labelPreview().children().should('have.attr', 'value').should('not.contain', `${labelInput}`);
});

When('I set input precision slider to {int}', (precision) => {
  setSlidebar(inputPrecisionSlider(), precision);
});

Then('input precision slider is set to {int}', (precision) => {
  inputPrecisionSlider().should('have.attr', 'value').should('contain', `${precision}`);
});
