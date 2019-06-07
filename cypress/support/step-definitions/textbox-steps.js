import { textbox } from '../../locators/textbox';
import { tooltipPreview, icon, label } from '../../locators';

const TEXT_ALIGN = 'text-align';

Then('Textbox placeholder is set to {string}', (text) => {
  textbox().should('have.attr', 'placeholder', text);
  textbox().children().should('have.attr', 'placeholder', text);
});

Then('Textbox component is disabled', () => {
  textbox().children()
    .should('have.css', 'color', 'rgb(179, 194, 200)')
    .and('have.css', 'cursor', 'not-allowed');
});

Then('Textbox component is not disabled', () => {
  textbox().should('not.be.disabled');
  textbox().children()
    .should('not.have.css', 'color', 'rgb(179, 194, 200)')
    .and('not.have.css', 'cursor', 'not-allowed');
});

Then('Textbox component is readOnly', () => {
  textbox().should('have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border-color', 'rgba(0, 0, 0, 0)')
    .and('not.have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('Textbox component is not readOnly', () => {
  textbox().should('not.have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('not.have.css', 'border-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
});

Then('errorMessage is displayed properly with proper icon', () => {
  tooltipPreview().should('have.css', 'background-color', 'rgb(199, 56, 79)');
  icon().should('have.attr', 'tooltiptype', 'error')
    .and('have.attr', 'data-element', 'error')
    .and('have.css', 'color', 'rgb(199, 56, 79)');
});

Then('infoMessage is displayed properly with proper icon', () => {
  tooltipPreview().should('have.css', 'background-color', 'rgb(27, 29, 33)');
  icon().should('have.attr', 'tooltiptype', 'info')
    .and('have.attr', 'data-element', 'info')
    .and('have.css', 'color', 'rgb(0, 115, 194)');
});

Then('warningMessage is displayed properly with proper icon', () => {
  tooltipPreview().should('have.css', 'background-color', 'rgb(27, 29, 33)');
  icon().should('have.attr', 'tooltiptype', 'warning')
    .and('have.attr', 'data-element', 'warning')
    .and('have.css', 'color', 'rgb(255, 181, 0)');
});

Then('Textbox component is labelInline', () => {
  label().should('have.css', TEXT_ALIGN, 'left');
});

Then('Textbox component is not labelInline', () => {
  label().should('not.have.css', TEXT_ALIGN, 'left');
});

Then('Textbox inputWidth is set to {string}', (width) => {
  textbox().should('have.css', 'flex', `0 0 ${width}%`);
});

When('I input {string} into Textbox', (text) => {
  textbox().children().clear().type(text);
});

Then('Textbox input on preview is set to {string}', () => {
  textbox().children().invoke('text').then(((text) => {
    expect(text.trim()).to.eq(text);
  }));
});
