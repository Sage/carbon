import { textbox, textboxByPosition, textboxDataComponent } from '../../locators/textbox';
import { label, labelByPosition, commonDataElementInputPreview } from '../../locators';

const TEXT_ALIGN = 'text-align';
const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;

Then('Textbox placeholder is set to {string}', (text) => {
  textbox().children().should('have.attr', 'placeholder', text);
});

Then('{string} textbox placeholder is set to {string}', (position, text) => {
  switch (position) {
    case 'First':
      textbox(FIRST_ELEMENT).children().should('have.attr', 'placeholder', text);
      break;
    case 'Second':
      textbox(SECOND_ELEMENT).children().should('have.attr', 'placeholder', text);
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox component is disabled', () => {
  textbox().children()
    .should('have.css', 'color', 'rgb(179, 194, 200)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('{string} textbox component is disabled', (position) => {
  switch (position) {
    case 'First':
      textbox(FIRST_ELEMENT).children()
        .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
        .and('have.css', 'cursor', 'not-allowed');
      break;
    case 'Second':
      textbox(SECOND_ELEMENT).children()
        .should('have.css', 'color', 'rgba(0, 0, 0, 0.55)')
        .and('have.css', 'cursor', 'not-allowed');
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox component is not disabled', () => {
  textbox().should('not.be.disabled');
  textbox().children()
    .should('not.have.css', 'color', 'rgb(179, 194, 200)')
    .and('not.have.css', 'cursor', 'not-allowed');
});

Then('{string} textbox component is not disabled', (position) => {
  switch (position) {
    case 'First':
      textbox(FIRST_ELEMENT).should('not.be.disabled');
      textbox(FIRST_ELEMENT).children()
        .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
        .and('not.have.css', 'cursor', 'not-allowed');
      break;
    case 'Second':
      textbox(SECOND_ELEMENT).should('not.be.disabled');
      textbox(SECOND_ELEMENT).children()
        .should('not.have.css', 'color', 'rgba(0, 0, 0, 0.55)')
        .and('not.have.css', 'cursor', 'not-allowed');
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox component is readOnly', () => {
  textbox().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'background-color', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('{string} textbox component is readOnly', (position) => {
  switch (position) {
    case 'First':
      textbox(FIRST_ELEMENT).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'background-color', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
      break;
    case 'Second':
      textbox(SECOND_ELEMENT).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'background-color', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox component is not readOnly', () => {
  textbox().should('not.have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('not.have.css', 'border-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('{string} textbox component is not readOnly', (position) => {
  switch (position) {
    case 'First':
      textbox(FIRST_ELEMENT).should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'background-color', 'rgb(255, 255, 255)');
      break;
    case 'Second':
      textbox(SECOND_ELEMENT).should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-bottom-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-right-color', 'rgba(0, 0, 0, 0)')
        .and('not.have.css', 'border-top-color', 'rgba(0, 0, 0, 0)')
        .and('have.css', 'background-color', 'rgb(255, 255, 255)');
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox component is labelInline', () => {
  label().should('have.css', TEXT_ALIGN, 'left');
});

Then('{string} textbox component is labelInline', (position) => {
  switch (position) {
    case 'First':
      labelByPosition(FIRST_ELEMENT).should('have.css', TEXT_ALIGN, 'left');
      break;
    case 'Second':
      labelByPosition(SECOND_ELEMENT).should('have.css', TEXT_ALIGN, 'left');
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox component is not labelInline', () => {
  label().should('not.have.css', TEXT_ALIGN, 'left');
});

Then('{string} textbox component is not labelInline', (position) => {
  switch (position) {
    case 'First':
      labelByPosition(FIRST_ELEMENT).should('not.have.css', TEXT_ALIGN, 'left');
      break;
    case 'Second':
      labelByPosition(SECOND_ELEMENT).should('not.have.css', TEXT_ALIGN, 'left');
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox inputWidth is set to {string}', (width) => {
  textbox().should('have.css', 'flex', `0 0 ${width}%`);
});

Then('{string} Textbox inputWidth is set to {string}', (position, width) => {
  switch (position) {
    case 'First':
      textbox(FIRST_ELEMENT).should('have.css', 'flex', `0 0 ${width}%`);
      break;
    case 'Second':
      textbox(SECOND_ELEMENT).should('have.css', 'flex', `0 0 ${width}%`);
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
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

Then('{string} textbox input on preview is set to {string}', (position) => {
  switch (position) {
    case 'First':
      textbox(FIRST_ELEMENT).children().invoke('text').then(((text) => {
        expect(text.trim()).to.eq(text);
      }));
      break;
    case 'Second':
      textbox(SECOND_ELEMENT).children().invoke('text').then(((text) => {
        expect(text.trim()).to.eq(text);
      }));
      break;
    default: throw new Error('There are only two textbox elements on the page');
  }
});

Then('Textbox input on preview is set to {string} for deprecated component', () => {
  textboxDataComponent().children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});
