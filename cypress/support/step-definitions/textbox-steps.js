import {
  textbox, textboxByPosition, textboxDataComponent, textboxIcon, textboxInput,
} from '../../locators/textbox';
import {
  label, labelByPosition, commonDataElementInputPreview, commonInputPreview,
  fieldHelpPreviewByPosition, tooltipPreviewByPosition, labelNoIFrame, commonDataElementInputPreviewNoIframe,
} from '../../locators';
import { DEBUG_FLAG } from '..';
import { positionOfElement } from '../helper';

const TEXT_ALIGN = 'text-align';

Then('Textbox placeholder is set to {string}', (text) => {
  textbox().children().should('have.attr', 'placeholder', text);
});

Then('Multiple Textbox placeholder is set to {string}', (text) => {
  textbox(positionOfElement('first')).children().should('have.attr', 'placeholder', text);
  textbox(positionOfElement('second')).children().should('have.attr', 'placeholder', text);
});

Then('Textbox component is disabled', () => {
  textbox().children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textbox multiple component is disabled', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox(positionOfElement('first')).children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
  textbox(positionOfElement('second')).children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textbox component is not disabled', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox().should('not.be.disabled');
  textbox().children()
    .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('not.have.css', 'cursor', 'not-allowed');
});

Then('Textbox multiple component is not disabled', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
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
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  const borderColor = 'rgb(204, 214, 218)';
  textbox().should('have.css', 'background-color', 'rgb(249, 250, 251)')
    .and('have.css', 'border-bottom-color', borderColor)
    .and('have.css', 'border-left-color', borderColor)
    .and('have.css', 'border-right-color', borderColor)
    .and('have.css', 'border-top-color', borderColor);
});

Then('Textbox multiple component is readOnly', () => {
  const borderReadonlyColor = 'rgb(204, 214, 218)';
  const backgroundColor = 'rgb(249, 250, 251)';
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
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
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox().should('not.have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('not.have.css', 'border-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('Textbox multiple component is not readOnly', () => {
  const borderNoReadonlyColor = 'rgba(0, 0, 0, 0)';
  const backgroundColor = 'rgb(255, 255, 255)';
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
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

Then('Multiple fieldHelp on preview is set to {string}', (text) => {
  fieldHelpPreviewByPosition(positionOfElement('first')).should('have.text', text);
  fieldHelpPreviewByPosition(positionOfElement('second')).should('have.text', text);
});

Then('Multiple label is set to {string}', (text) => {
  labelByPosition(positionOfElement('first')).should('have.text', text);
  labelByPosition(positionOfElement('second')).should('have.text', text);
});

Then('Textbox component is labelInline', () => {
  label().should('have.css', TEXT_ALIGN, 'left');
});

Then('Multiple Textbox component is labelInline', () => {
  labelByPosition(positionOfElement('first')).should('have.css', TEXT_ALIGN, 'left');
  labelByPosition(positionOfElement('second')).should('have.css', TEXT_ALIGN, 'left');
});

Then('Textbox component is not labelInline', () => {
  label().should('not.have.css', TEXT_ALIGN, 'left');
});

Then('Multiple Textbox component is not labelInline', () => {
  labelByPosition(positionOfElement('first')).should('not.have.css', TEXT_ALIGN, 'left');
  labelByPosition(positionOfElement('second')).should('not.have.css', TEXT_ALIGN, 'left');
});

Then('Multiple tooltipPreview on preview is set to {string}', (text) => {
  tooltipPreviewByPosition(positionOfElement('first')).should('have.text', text);
  tooltipPreviewByPosition(positionOfElement('second')).should('have.text', text);
});

Then('Textbox inputWidth is set to {string}', (width) => {
  textbox().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('Multiple Textbox inputWidth is set to {string}', (width) => {
  textbox(positionOfElement('first')).should('have.css', 'flex', `0 0 ${width}%`);
  textbox(positionOfElement('second')).should('have.css', 'flex', `0 0 ${width}%`);
});

Then('Multiple label width is set to {string}', (width) => {
  labelByPosition(positionOfElement('first')).should('have.attr', 'width', `${width}`);
  labelByPosition(positionOfElement('second')).should('have.attr', 'width', `${width}`);
});

When('I input {string} into Textbox', (text) => {
  textbox().children().clear().type(text);
});

When('I input {string} into {string} Textbox', (text, position) => {
  textboxByPosition(positionOfElement(position)).children().clear().type(text);
});

When('I input {string} into Textbox for deprecated component', (text) => {
  commonDataElementInputPreview().clear().type(text);
});

Then('Textbox input on preview is set to {string}', () => {
  textbox().children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});

Then('Multiple textbox input on preview is set to {string}', () => {
  textbox(positionOfElement('first')).children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
  textbox(positionOfElement('second')).children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});

Then('Textbox input on preview is set to {string} for deprecated component', () => {
  textboxDataComponent().children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});

Then('Textbox height is {string}', (height) => {
  commonInputPreview().should('have.css', 'height', height);
});

Then('Multiple Textbox height is {string}', (height) => {
  commonInputPreview(positionOfElement('first')).should('have.css', 'height', height);
  commonInputPreview(positionOfElement('second')).should('have.css', 'height', height);
});

Then('Textbox width is {string}', (width) => {
  commonInputPreview().should('have.css', 'width', width);
});

Then('Multiple Textbox width is {string}', (width) => {
  commonInputPreview(positionOfElement('first')).should('have.css', 'width', width);
  commonInputPreview(positionOfElement('second')).should('have.css', 'width', width);
});

Then('Multiple label Align on preview is {string}', (direction) => {
  labelByPosition(positionOfElement('first')).should($element => expect($element).to.have.css(TEXT_ALIGN, `${direction}`));
  labelByPosition(positionOfElement('second')).should($element => expect($element).to.have.css(TEXT_ALIGN, `${direction}`));
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
  textbox().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

Then('Textbox overriden styles rendered properly', () => {
  labelNoIFrame().parent().parent().should('have.css', 'background', 'rgb(240, 240, 240) none repeat scroll 0% 0% / auto padding-box border-box');
  labelNoIFrame().parent().should('have.css', 'display', 'flex');
  labelNoIFrame().should('have.css', 'display', 'block')
    .and('have.css', 'font-weight', '600')
    .and('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'padding-bottom', '0px')
    .and('have.css', 'padding-top', '12px')
    .and('have.css', 'padding-right', '11px')
    .and('have.css', 'color', 'rgb(180, 212, 85)');
  commonDataElementInputPreviewNoIframe().parent().should('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '1px solid rgb(102, 132, 145)')
    .and('have.css', 'flex', '0 0 auto');
  commonDataElementInputPreviewNoIframe().should('have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '0px none rgba(0, 0, 0, 0.9)')
    .and('have.css', 'color', 'rgba(0, 0, 0, 0.9)');
});
