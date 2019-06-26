import {
  textarea, textareaChildren, colsSlider, rowsSlider,
  characterLimit, textareaInput,
} from '../../locators/textarea';
import { setSlidebar, countCharacters } from '../helper';
import { fieldHelpPreview, label } from '../../locators';

const TEXT_ALIGN = 'text-align';

Then('Textarea component is expandable', () => {
  textareaChildren()
    .should('have.attr', 'style', 'height: 50px;');
});

Then('Textarea component is not expandable', () => {
  textareaChildren()
    .should('not.have.attr', 'style', 'height: 50px;');
});

Then('cols is set to {string}', (colsValue) => {
  textareaChildren()
    .should('have.attr', 'cols', colsValue);
});

Then('rows is set to {string}', (colsValue) => {
  textareaChildren()
    .should('have.attr', 'rows', colsValue);
});

When('I set cols slider to {int}', (colsValue) => {
  setSlidebar(colsSlider(), colsValue);
});

When('I set rows slider to {int}', (rowsValue) => {
  setSlidebar(rowsSlider(), rowsValue);
});

Then('Textarea component is disabled', () => {
  textareaChildren().should('be.disabled');
  textareaChildren()
    .should('have.css', 'color', 'rgb(179, 194, 200)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textarea component is not disabled', () => {
  textareaChildren().should('not.be.disabled');
  textareaChildren()
    .should('not.have.css', 'color', 'rgb(179, 194, 200)')
    .and('not.have.css', 'cursor', 'not-allowed');
});

Then('Textarea component is readOnly', () => {
  textareaChildren().should('have.attr', 'readonly');
});

Then('Textarea component is not readOnly', () => {
  textareaChildren().should('not.have.attr', 'readonly');
});

Then('placeholder is set to {string}', (text) => {
  textareaChildren().should('have.attr', 'placeholder', text);
});

Then('fieldHelp is set to {string}', (text) => {
  fieldHelpPreview().should('have.text', text);
});

Then('characterLimit is set to {string}', (length) => {
  textareaChildren().should('have.attr', 'maxlength', length);
});

Then('characterLimit is shown as {string}', (length) => {
  characterLimit().should('have.text', length);
});

Then('characterLimit is not set to {string}', (length) => {
  textareaChildren().should('have.attr', 'maxlength', length);
  characterLimit().should('have.text', 'NaN');
});

Then('Textarea inputWidth is set to {string}', (width) => {
  textarea().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('label is set to {string}', (text) => {
  label().should('have.text', text);
});

Then('label is set to {string}', (text) => {
  label().should('have.text', text);
});

Then('Textarea component is labelInline', () => {
  label().should('have.css', TEXT_ALIGN, 'left');
});

Then('Textarea component is not labelInline', () => {
  label().should('not.have.css', TEXT_ALIGN, 'left');
});

When('I input {string} into Textarea', (text) => {
  textareaChildren().clear().type(text);
});

Then('Textarea component has warnOverLimit and used characters {int} of {int}', (overCharacterLimit, limit) => {
  characterLimit().parent()
    .should('have.text', `You have used ${overCharacterLimit} of ${limit} characters`)
    .and('have.css', 'color', 'rgb(199, 56, 79)');
});

Then('Textarea component has no warnOverLimit and used characters {int} of {int}', (charactersUsed, limit) => {
  characterLimit().parent()
    .should('have.text', `You have used ${charactersUsed} of ${limit} characters`)
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.85)');
});

Then('Textarea component has enforceCharacterLimit enabled and used characters {int} are equal to limit {int}', (charactersUsed, limit) => {
  characterLimit().parent()
    .should('have.text', `You have used ${charactersUsed} of ${limit} characters`)
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.85)');
});

Then('Textarea component has enforceCharacterLimit disabled and used characters {int} are more than limit {int}', (charactersUsed, limit) => {
  characterLimit().parent()
    .should('have.text', `You have used ${charactersUsed} of ${limit} characters`)
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.85)');
});

When('I input {string} into Textarea', (text) => {
  textareaInput().children().clear().type(text);
});

Then('Textarea input on preview is set to {string}', () => {
  textarea().children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});
