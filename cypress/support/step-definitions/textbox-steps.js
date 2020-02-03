import {
  textbox, textboxByPosition, textboxDataComponent, textboxIcon, textboxInput,
} from '../../locators/textbox';
import {
  label, labelByPosition, commonDataElementInputPreview, commonInputPreview,
  fieldHelpPreviewByPosition, tooltipPreviewByPosition,
} from '../../locators';
import { DEBUG_FLAG } from '..';

const TEXT_ALIGN = 'text-align';
const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;

Then('Textbox placeholder is set to {string}', (text) => {
  textbox().children().should('have.attr', 'placeholder', text);
});

Then('Multiple Textbox placeholder is set to {string}', (text) => {
  textbox(FIRST_ELEMENT).children().should('have.attr', 'placeholder', text);
  textbox(SECOND_ELEMENT).children().should('have.attr', 'placeholder', text);
});

Then('Textbox component is disabled', () => {
  textbox().children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textbox component is disabled for classic page', () => {
  textbox().children()
    .should('have.css', 'color', 'rgb(179, 194, 200)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textbox multiple component is disabled', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox(FIRST_ELEMENT).children()
    .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('have.css', 'cursor', 'not-allowed');
  textbox(SECOND_ELEMENT).children()
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
  textbox(FIRST_ELEMENT).should('not.be.disabled');
  textbox(FIRST_ELEMENT).children()
    .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('not.have.css', 'cursor', 'not-allowed');
  textbox(SECOND_ELEMENT).should('not.be.disabled');
  textbox(SECOND_ELEMENT).children()
    .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
    .and('not.have.css', 'cursor', 'not-allowed');
});

Then('Textbox component is readOnly for classic story', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-bottom-color', 'rgb(204, 214, 219)')
    .and('have.css', 'border-left-color', 'rgb(204, 214, 219)')
    .and('have.css', 'border-right-color', 'rgb(204, 214, 219)')
    .and('have.css', 'border-top-color', 'rgb(204, 214, 219)')
    .and('not.have.css', 'background-color', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('Textbox component is readOnly', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-bottom-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-left-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-right-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-top-color', 'rgb(102, 132, 145)')
    .and('not.have.css', 'background-color', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('Textbox multiple component is readOnly', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox(FIRST_ELEMENT).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-bottom-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-left-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-right-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-top-color', 'rgb(102, 132, 145)')
    .and('not.have.css', 'background-color', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
  textbox(SECOND_ELEMENT).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-bottom-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-left-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-right-color', 'rgb(102, 132, 145)')
    .and('have.css', 'border-top-color', 'rgb(102, 132, 145)')
    .and('not.have.css', 'background-color', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('Textbox component is not readOnly', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox().should('not.have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('not.have.css', 'border-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('Textbox multiple component is not readOnly', () => {
  cy.wait(100, { log: DEBUG_FLAG }); // added due to animation changing
  textbox(FIRST_ELEMENT).should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background-color', 'rgb(255, 255, 255)');
  textbox(SECOND_ELEMENT).should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background-color', 'rgb(255, 255, 255)');
});

Then('Multiple fieldHelp on preview is set to {string}', (text) => {
  fieldHelpPreviewByPosition(FIRST_ELEMENT).should('have.text', text);
  fieldHelpPreviewByPosition(SECOND_ELEMENT).should('have.text', text);
});

Then('Multiple label is set to {string}', (text) => {
  labelByPosition(FIRST_ELEMENT).should('have.text', text);
  labelByPosition(SECOND_ELEMENT).should('have.text', text);
});

Then('Textbox component is labelInline', () => {
  label().should('have.css', TEXT_ALIGN, 'left');
});

Then('Multiple Textbox component is labelInline', () => {
  labelByPosition(FIRST_ELEMENT).should('have.css', TEXT_ALIGN, 'left');
  labelByPosition(SECOND_ELEMENT).should('have.css', TEXT_ALIGN, 'left');
});

Then('Textbox component is not labelInline', () => {
  label().should('not.have.css', TEXT_ALIGN, 'left');
});

Then('Multiple Textbox component is not labelInline', () => {
  labelByPosition(FIRST_ELEMENT).should('not.have.css', TEXT_ALIGN, 'left');
  labelByPosition(SECOND_ELEMENT).should('not.have.css', TEXT_ALIGN, 'left');
});

Then('Multiple tooltipPreview on preview is set to {string}', (text) => {
  tooltipPreviewByPosition(FIRST_ELEMENT).should('have.text', text);
  tooltipPreviewByPosition(SECOND_ELEMENT).should('have.text', text);
});

Then('Textbox inputWidth is set to {string}', (width) => {
  textbox().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('Multiple Textbox inputWidth is set to {string}', (width) => {
  textbox(FIRST_ELEMENT).should('have.css', 'flex', `0 0 ${width}%`);
  textbox(SECOND_ELEMENT).should('have.css', 'flex', `0 0 ${width}%`);
});

Then('Multiple label width is set to {string}', (width) => {
  labelByPosition(FIRST_ELEMENT).should('have.attr', 'width', `${width}`);
  labelByPosition(SECOND_ELEMENT).should('have.attr', 'width', `${width}`);
});

When('I input {string} into Textbox', (text) => {
  textbox().children().clear().type(text);
});

When('I input {string} into {string} Textbox', (text, position) => {
  switch (position) {
    case 'first':
      textboxByPosition(FIRST_ELEMENT).children().clear().type(text);
      break;
    case 'second':
      textboxByPosition(SECOND_ELEMENT).children().clear().type(text);
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
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
  textbox(FIRST_ELEMENT).children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
  textbox(SECOND_ELEMENT).children().invoke('text').then(((text) => {
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
  commonInputPreview(FIRST_ELEMENT).should('have.css', 'height', height);
  commonInputPreview(SECOND_ELEMENT).should('have.css', 'height', height);
});

Then('Textbox width is {string}', (width) => {
  commonInputPreview().should('have.css', 'width', width);
});

Then('Multiple Textbox width is {string}', (width) => {
  commonInputPreview(FIRST_ELEMENT).should('have.css', 'width', width);
  commonInputPreview(SECOND_ELEMENT).should('have.css', 'width', width);
});

Then('Multiple label Align on preview is {string}', (direction) => {
  labelByPosition(FIRST_ELEMENT).should($element => expect($element).to.have.css(TEXT_ALIGN, `${direction}`));
  labelByPosition(SECOND_ELEMENT).should($element => expect($element).to.have.css(TEXT_ALIGN, `${direction}`));
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
