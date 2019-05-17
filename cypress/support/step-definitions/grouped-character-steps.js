import { commonDataElementInputPreview, label } from '../../locators';

const LABEL_INPUT_INLINE_CLASS = 'common-input__label--inline';

When('I put {string} example grouped character', (text) => {
  commonDataElementInputPreview().clear().type(text, { delay: 1000, force: true });
});

Then('example grouped character is {string}', (text) => {
  commonDataElementInputPreview().should('have.value', text);
});

Then('groupedCharacter labelInline is enabled', () => {
  label().should('have.class', LABEL_INPUT_INLINE_CLASS);
});

Then('groupedCharacter labelInline is disabled', () => {
  label().should('not.have.class', LABEL_INPUT_INLINE_CLASS);
});

Then('groupedCharacter labelWidth is set to {string}', (width) => {
  label().should('have.attr', 'style', `width: ${width}%;`);
});
