import { enableOnChangeDeferredAction, enableKeyDownAction } from '../../locators/number-input';
import { commonDataElementInputPreview, label } from '../../locators';

const TEXT_ALIGN_START = 'flex-start';

When('I check Enable onChangeDeferred Action property', () => {
  enableOnChangeDeferredAction().click();
});

When('I check Enable onKeyDown Action property', () => {
  enableKeyDownAction().click();
});

When('I input {int} into NumberInput component', (number) => {
  commonDataElementInputPreview().clear().type(number);
});

When('I press keyboard {string} keys into NumberInput input component', (key) => {
  commonDataElementInputPreview().clear().type(`{${key}}`);
});

Then('{word} input component is {word}', (componentName, parameter) => {
  if (parameter === 'disabled') {
    commonDataElementInputPreview().should(`be.${parameter}`)
      .and('have.attr', parameter);
    commonDataElementInputPreview().parent().should('have.attr', parameter);
  } else {
    commonDataElementInputPreview().should('have.attr', parameter);
    commonDataElementInputPreview().parent().should('have.attr', parameter);
  }
});

Then('{word} input component is not {word}', (parameter) => {
  if (parameter === 'disabled') {
    commonDataElementInputPreview().should(`not.be.${parameter}`)
      .and('not.have.attr', parameter);
    commonDataElementInputPreview().parent().should(`not.be.${parameter}`)
      .and('not.have.attr', parameter);
  } else {
    commonDataElementInputPreview().should('not.have.attr', parameter);
    commonDataElementInputPreview().parent().should('not.have.attr', parameter);
  }
});

Then('{word} input component size is set to {string} and has min-height set to {int} and paddings set to {int}', (componentName, size, minHeight, px) => {
  commonDataElementInputPreview().parent().should('have.css', 'min-height', `${minHeight}px`)
    .and('have.css', 'padding-left', `${px}px`)
    .and('have.css', 'padding-right', `${px}px`);
});

Then('NumberInput component labelInline is enabled', () => {
  label().parent().should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'justify-content', TEXT_ALIGN_START)
    .and('have.css', 'padding-bottom', '0px')
});

Then('{word} component labelInline is disabled', () => {
  label().parent().should('not.have.css', 'box-sizing', 'border-box')
    .and('not.have.css', 'justify-content', TEXT_ALIGN_START)
});

Then('{word} Input component inputWidth is set to {int}', (componentName, width) => {
  commonDataElementInputPreview().parent().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('{word} Input component labelWidth is set to {string}', (componentName, width) => {
  label().parent().should('have.attr', 'width', width);
});
