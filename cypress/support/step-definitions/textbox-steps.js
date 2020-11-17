import {
  textbox,
  textboxByPosition,
  textboxIcon,
  textboxInput,
  textboxInIFrame,
  textboxPrefixByPosition,
} from '../../locators/textbox';
import {
  commonDataElementInputPreviewNoIframe,
  getDataElementByValue,
  tooltipPreviewByPositionNoIFrame,
  labelByPosition,
  fieldHelpPreviewByPositionNoIFrame,
  commonDataElementInputPreviewByPositionNoIFrame,
  getDataElementByValueAndPosition,
} from '../../locators';
import { positionOfElement } from '../helper';

const TEXT_ALIGN = 'justify-content';
const TEXT_ALIGN_START = 'flex-start';
const TEXT_ALIGN_END = 'flex-end';

Then('Textbox placeholder is set to {word}', (text) => {
  textbox().children().should('have.attr', 'placeholder', text);
});

Then('Multiple Textbox placeholder is set to {word}', (text) => {
  textbox(positionOfElement('first')).children().should('have.attr', 'placeholder', text);
  textbox(positionOfElement('second')).children().should('have.attr', 'placeholder', text);
});

Then('Textbox component is disabled', () => {
  textbox().children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textbox multiple component is disabled', () => {
  textbox(positionOfElement('first')).children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
  textbox(positionOfElement('second')).children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textbox component is not disabled', () => {
  textbox().should('not.be.disabled');
  textbox().children()
    .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('not.have.css', 'cursor', 'not-allowed');
});

Then('Textbox multiple component is not disabled', () => {
  textbox(positionOfElement('first')).should('not.be.disabled');
  textbox(positionOfElement('first')).children()
    .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('not.have.css', 'cursor', 'not-allowed');
  textbox(positionOfElement('second')).should('not.be.disabled');
  textbox(positionOfElement('second')).children()
    .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('not.have.css', 'cursor', 'not-allowed');
});

Then('Textbox component is readOnly', () => {
  const borderColor = 'rgb(204, 214, 219)';
  textbox().should('have.css', 'background-color', 'rgb(250, 251, 251)')
    .and('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor);
});

Then('Textbox multiple component is readOnly', () => {
  const borderReadonlyColor = 'rgb(204, 214, 219)';
  const backgroundColor = 'rgb(250, 251, 251)';
  textbox(positionOfElement('first')).should('have.css', 'background-color', backgroundColor)
    .and('have.css', 'border-bottom-color', borderReadonlyColor)
    .and('have.css', 'border-left-color', borderReadonlyColor)
    .and('have.css', 'border-right-color', borderReadonlyColor)
    .and('have.css', 'border-top-color', borderReadonlyColor);
  textbox(positionOfElement('second')).should('have.css', 'background-color', backgroundColor)
    .and('have.css', 'border-bottom-color', borderReadonlyColor)
    .and('have.css', 'border-left-color', borderReadonlyColor)
    .and('have.css', 'border-right-color', borderReadonlyColor)
    .and('have.css', 'border-top-color', borderReadonlyColor);
});

Then('Textbox component is not readOnly', () => {
  textbox().should('not.have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('not.have.css', 'border-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('Textbox multiple component is not readOnly', () => {
  const borderNoReadonlyColor = 'rgba(0, 0, 0, 0)';
  const backgroundColor = 'rgb(255, 255, 255)';
  textbox(positionOfElement('first')).should('not.have.css', 'background-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-bottom-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-left-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-right-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-top-color', borderNoReadonlyColor)
    .and('have.css', 'background-color', backgroundColor);
  textbox(positionOfElement('second')).should('not.have.css', 'background-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-bottom-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-left-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-right-color', borderNoReadonlyColor)
    .and('not.have.css', 'border-top-color', borderNoReadonlyColor)
    .and('have.css', 'background-color', backgroundColor);
});

Then('Multiple fieldHelp on preview is set to {word}', (text) => {
  fieldHelpPreviewByPositionNoIFrame(positionOfElement('first')).should('have.text', text);
  fieldHelpPreviewByPositionNoIFrame(positionOfElement('second')).should('have.text', text);
});

Then('Multiple label is set to {word}', (text) => {
  labelByPosition(positionOfElement('first')).should('have.text', text);
  labelByPosition(positionOfElement('second')).should('have.text', text);
});

Then('Textbox component is labelInline', () => {
  getDataElementByValue('label').parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_END);
});

Then('Multiple Textbox component is labelInline', () => {
  getDataElementByValueAndPosition('label', positionOfElement('first')).parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_END);
  getDataElementByValueAndPosition('label', positionOfElement('second')).parent().should('have.css', TEXT_ALIGN, TEXT_ALIGN_END);
});

Then('Textbox component is not labelInline', () => {
  getDataElementByValue('label').parent().should('not.have.css', TEXT_ALIGN, TEXT_ALIGN_START);
});

Then('Multiple Textbox component is not labelInline', () => {
  labelByPosition(positionOfElement('first')).should('not.have.css', TEXT_ALIGN, 'left');
  labelByPosition(positionOfElement('second')).should('not.have.css', TEXT_ALIGN, 'left');
});

Then('Multiple tooltipPreview on preview is set to {word}', (text) => {
  tooltipPreviewByPositionNoIFrame(positionOfElement('first')).wait(250).should('have.text', text);
  tooltipPreviewByPositionNoIFrame(positionOfElement('second')).wait(250).should('have.text', text);
});

Then('Textbox inputWidth is set to {string}', (width) => {
  textbox().parent().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('Multiple Textbox inputWidth is set to {string}', (width) => {
  textboxByPosition(positionOfElement('first')).parent().should('have.css', 'flex', `0 0 ${width}%`);
  textboxByPosition(positionOfElement('second')).parent().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('Multiple label width is set to {string}', (width) => {
  getDataElementByValueAndPosition('label', positionOfElement('first')).parent().should('have.attr', 'width', `${width}`);
  getDataElementByValueAndPosition('label', positionOfElement('second')).parent().should('have.attr', 'width', `${width}`);
});

When('I type {word} into Textbox', (text) => {
  textbox().children().clear().type(text);
});

When('I type {word} into {string} Textbox', (text, position) => {
  textboxByPosition(positionOfElement(position)).children().clear().type(text);
});

Then('Textbox input on preview is set to {word}', () => {
  textbox().children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});

Then('Multiple textbox input on preview is set to {word}', () => {
  textbox(positionOfElement('first')).children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
  textbox(positionOfElement('second')).children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});

Then('Textbox height is {string}', (height) => {
  commonDataElementInputPreviewNoIframe().should('have.css', 'height', height);
});

Then('Multiple Textbox height is {string}', (height) => {
  commonDataElementInputPreviewByPositionNoIFrame(positionOfElement('first')).should('have.css', 'height', height);
  commonDataElementInputPreviewByPositionNoIFrame(positionOfElement('second')).should('have.css', 'height', height);
});

Then('Textbox width is {string}', (width) => {
  commonDataElementInputPreviewNoIframe().should('have.css', 'width', width);
});

Then('Multiple Textbox width is {string}', (width) => {
  commonDataElementInputPreviewByPositionNoIFrame(positionOfElement('first')).should('have.css', 'width', width);
  commonDataElementInputPreviewByPositionNoIFrame(positionOfElement('second')).should('have.css', 'width', width);
});

Then('Multiple label Align on preview is {string}', (direction) => {
  if (direction === 'left') {
    labelByPosition(positionOfElement('first')).parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_START));
    labelByPosition(positionOfElement('second')).parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_START));
  } else {
    labelByPosition(positionOfElement('first')).parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_END));
    labelByPosition(positionOfElement('second')).parent().should($element => expect($element).to.have.css(TEXT_ALIGN, TEXT_ALIGN_END));
  }
});

Then('I click on icon inside of Textbox', () => {
  textboxIcon().click();
});

Then('icon on preview is {string} and is visible', (iconName) => {
  textboxIcon().should('have.attr', 'data-element', iconName)
    .and('be.visible');
});

When('I click on Textbox', () => {
  textboxInput().click();
});

Then('Textbox input has golden border on focus', () => {
  textboxInIFrame().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

Then('Prefix is set to {word}', (prefix) => {
  textboxPrefixByPosition(positionOfElement('first')).should('have.text', prefix)
    .and('have.css', 'font-size', '14px')
    .and('have.css', 'font-weight', '900')
    .and('have.css', 'margin-right', '8px');
});

Then('Multiple textbox prefix is set to {word}', (prefix) => {
  textboxPrefixByPosition(positionOfElement('first')).should('have.text', prefix)
    .and('have.css', 'font-size', '14px')
    .and('have.css', 'font-weight', '900')
    .and('have.css', 'margin-right', '8px');
  textboxPrefixByPosition(positionOfElement('second')).should('have.text', prefix)
    .and('have.css', 'font-size', '14px')
    .and('have.css', 'font-weight', '900')
    .and('have.css', 'margin-right', '8px');
});
