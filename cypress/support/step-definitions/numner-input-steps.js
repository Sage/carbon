import { enableOnChangeDefferedAction, enableKeyDownAction } from '../../locators/number-input';
import { commonDataElementInputPreview, label } from '../../locators';

When('I check Enable onChangeDeferred Action property', () => {
  enableOnChangeDefferedAction().click();
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

Then('Number input component is {word}', (parameter) => {
  if (parameter === 'disabled') {
    commonDataElementInputPreview().should(`be.${parameter}`)
      .and('have.attr', parameter);
    commonDataElementInputPreview().parent().should('have.attr', parameter);
  } else {
    commonDataElementInputPreview().should('have.attr', parameter);
    commonDataElementInputPreview().parent().should('have.attr', parameter);
  }
});

Then('Number input component is not {word}', (parameter) => {
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

Then('Number input component size is set to {string} and has min-height set to {int} and paddings set to {int}', (size, minHeight, px) => {
  commonDataElementInputPreview().parent().should('have.css', 'min-height', `${minHeight}px`)
    .and('have.css', 'padding-left', `${px}px`)
    .and('have.css', 'padding-right', `${px}px`);
});

Then('NumberInput component labelInline is enabled {string}', (classicStory) => {
  switch (classicStory) {
    case 'true':
      label().should('have.css', 'align-self', 'center')
        .and('have.css', 'box-sizing', 'border-box')
        .and('have.css', 'padding-bottom', '0px')
        .and('have.css', 'padding-right', '8px')
        .and('have.css', 'text-align', 'left');
      break;
    case 'false':
      label().should('have.css', 'align-self', 'center')
        .and('have.css', 'box-sizing', 'border-box')
        .and('have.css', 'padding-bottom', '0px')
        .and('have.css', 'padding-right', '11px')
        .and('have.css', 'text-align', 'left');
      break;
    default: throw new Error('True of False could be used only');
  }
});

Then('NumberInput component labelInline is disabled', () => {
  label().should('have.css', 'display', 'block')
    .and('have.css', 'padding-bottom', '8px')
    .and('not.have.css', 'align-self', 'center')
    .and('not.have.css', 'box-sizing', 'border-box')
    .and('not.have.css', 'padding-bottom', '0px')
    .and('not.have.css', 'padding-right', '11px')
    .and('not.have.css', 'text-align', 'left');
});

Then('Number Input component inputWidth is set to {int}', (width) => {
  commonDataElementInputPreview().parent().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('Number Input component labelWidth is set to {int}', (width) => {
  label().should('have.css', 'width', `${width}px`);
});
