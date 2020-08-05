import { enableOnChangeDeferredAction, enableKeyDownAction } from '../../locators/number-input';
import { commonDataElementInputPreview, 
  commonDataElementInputPreviewNoIframe, 
  labelNoIFrame } 
  from '../../locators';
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
    commonDataElementInputPreviewNoIframe().should(`be.${parameter}`)
      .and('have.attr', parameter);
    commonDataElementInputPreviewNoIframe().parent().should('have.attr', parameter);
  } else {
    commonDataElementInputPreviewNoIframe().should('have.attr', parameter);
    commonDataElementInputPreviewNoIframe().parent().should('have.attr', parameter);
  }
});

Then('{word} input component is not {word}', (parameter) => {
  if (parameter === 'disabled') {
    commonDataElementInputPreviewNoIframe().should(`not.be.${parameter}`)
      .and('not.have.attr', parameter);
    commonDataElementInputPreviewNoIframe().parent().should(`not.be.${parameter}`)
      .and('not.have.attr', parameter);
  } else {
    commonDataElementInputPreviewNoIframe().should('not.have.attr', parameter);
    commonDataElementInputPreviewNoIframe().parent().should('not.have.attr', parameter);
  }
});

Then('{word} input component size is set to {string} and has min-height set to {int} and paddings set to {int}', (componentName, size, minHeight, px) => {
  commonDataElementInputPreviewNoIframe().parent().should('have.css', 'min-height', `${minHeight}px`)
    .and('have.css', 'padding-left', `${px}px`)
    .and('have.css', 'padding-right', `${px}px`);
});

Then('{word} component labelInline is disabled', () => {
  labelNoIFrame().parent().should('not.have.css', 'box-sizing', 'border-box')
    .and('not.have.css', 'justify-content', TEXT_ALIGN_START)
});
