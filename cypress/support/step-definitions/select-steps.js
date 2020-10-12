import {
  select,
  selectInput,
  selectPill,
  simpleSelectID,
  selectOption,
  dropdownButton,
  controlledLabel,
  selectList,
  simpleSelectNoIframe,
  selectDataComponent,
  simpleSelectIframe,
  multiSelectDataComponent,
  openOnFocusID,
  multiSelectPill,
  multiSelectPillByPosition,
  selectInputIframe,
  selectPillIframe,
  dropdownButtonInIframe,
  selectDataComponentInIframe,
  selectListInIframe,
  selectOptionInIframe,
  multiSelectDataComponentInIframe,
} from '../../locators/select';
import { positionOfElement, keyCode } from '../helper';
import { label } from '../../locators';

const transparentBorderColor = 'rgba(0, 0, 0, 0.85)';
const notTransparentBorderColor = 'rgb(102, 133, 146)';

Then('Select typeAhead is disabled', () => {
  select().should('have.attr', 'placeholder', 'Please Select...');
});

Then('Select typeAhead is enabled', () => {
  select().should('have.attr', 'placeholder', 'Type to Search...');
});

When('Type {string} text into input', (text) => {
  selectInput().clear().type(text);
});

Then('Select input has {string} value', (text) => {
  selectInput().should('have.attr', 'value', text);
});

Then('Select input has {string} value in iFrame', (text) => {
  selectInputIframe().should('have.attr', 'value', text);
});

Then('Select multiple input {int} element and has {string} value', (index, text) => {
  selectPill(index).should('have.attr', 'title', text);
});

Then('Select multiple input {int} element and has {string} value in Iframe', (index, text) => {
  selectPillIframe(index).should('have.attr', 'title', text);
});

Then('Select placeholder on preview is set to {word}', (text) => {
  select().should('have.attr', 'placeholder', text);
});

Then('Select size on preview for default component is set to {string}', (size) => {
  switch (size) {
    case 'small':
      select().should('have.css', 'height', '30px')
        .and('have.css', 'width', '1247px');
      break;
    case 'medium':
      select().should('have.css', 'height', '38px')
        .and('have.css', 'width', '1239px');
      break;
    case 'large':
      select().should('have.css', 'height', '38px')
        .and('have.css', 'width', '1239px');
      break;
    default: throw new Error('There is no such size for a Select component input');
  }
});

Then('Select is disabled', () => {
  select().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Select is enabled', () => {
  select().should('not.be.disabled').and('not.have.attr', 'disabled');
});

Then('Select is readOnly', () => {
  select().should('have.attr', 'readOnly');
});

Then('Select is not readOnly', () => {
  select().should('not.have.attr', 'readOnly');
});

When('Type {string} text into input and select the value in iFrame', (text) => {
  selectInputIframe().type(`${text}{downarrow}{enter}`);
});

When('Type {string} text into input and select the value', (text) => {
  selectInput().type(`${text}{downarrow}{enter}`);
});

Then('Select is transparent', () => {
  select().parent().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'border-left-color', transparentBorderColor)
    .and('have.css', 'border-right-color', transparentBorderColor)
    .and('have.css', 'border-top-color', transparentBorderColor);
  select().should('have.css', 'font-weight', '900');
});

Then('Select is not transparent', () => {
  select().parent().should('have.css', 'background-color', 'rgb(255, 255, 255)')
    .and('have.css', 'border-left-color', notTransparentBorderColor)
    .and('have.css', 'border-right-color', notTransparentBorderColor)
    .and('have.css', 'border-top-color', notTransparentBorderColor);
  select().should('have.css', 'font-weight', '400');
});

Then('Select placeholder align on preview is set to {string}', (direction) => {
  select().should('have.css', 'text-align', direction);
});

When('I focus select input', () => {
  simpleSelectID().focus();
});

When('I focus basic Select input', () => {
  simpleSelectIframe().focus();
});

When('I focus openOnFocus Select input', () => {
  openOnFocusID().focus();
});

Then('{string} Select list is opened', (name) => {
  selectDataComponent(name).should('have.attr', 'aria-expanded', 'true');
  selectList().should('be.visible');
});

Then('{string} Select list is closed', (name) => {
  selectDataComponent(name).should('have.attr', 'aria-expanded', 'false');
  selectList().should('not.be.visible');
});

Then('{string} Select list is closed in iframe', (name) => {
  selectDataComponentInIframe(name).should('have.attr', 'aria-expanded', 'false');
  selectListInIframe().should('not.be.visible');
});

Then('multi Select list is opened', () => {
  multiSelectDataComponent().should('have.attr', 'aria-expanded', 'true');
  selectList().should('be.visible');
});

Then('multi Select list is closed', () => {
  multiSelectDataComponent().should('have.attr', 'aria-expanded', 'false');
  selectList().should('not.be.visible');
});

Then('multi Select list is closed in iframe', () => {
  multiSelectDataComponentInIframe().should('have.attr', 'aria-expanded', 'false');
  selectListInIframe().should('not.be.visible');
});

When('I click on Select input', () => {
  simpleSelectID().click();
});

When('I click on basic Select input', () => {
  simpleSelectIframe().click();
});

When('I click on Select input in noIframe', () => {
  simpleSelectNoIframe().click();
});

When('{string} option on the list is highlighted', (position) => {
  selectOption(positionOfElement(position)).should('have.attr', 'aria-selected', 'true')
    .and('have.css', 'background-color', 'rgb(242, 245, 246)');
});

When('I click onto controlled select using {string} key', (key) => {
  simpleSelectID().trigger('keydown', keyCode(key));
});

When('I click onto basic select using {string} key', (key) => {
  simpleSelectIframe().trigger('keydown', keyCode(key));
});

Then('Design system Select input has {string} value', (text) => {
  simpleSelectID().should('have.attr', 'value', text);
});

Then('Multi select input has {string} pill', (text) => {
  multiSelectPill().should('have.attr', 'title', text);
});

Then('Multi select {string} pill has {string} value', (int, text) => {
  multiSelectPillByPosition(positionOfElement(int)).should('have.attr', 'title', text);
});

Then('Multi select input has not any value', () => {
  multiSelectDataComponent(1).should('not.have.attr', 'data-component', 'pill');
});

When('I click on dropdown button', () => {
  dropdownButton().click();
});

When('I click on dropdown button in iframe', () => {
  dropdownButtonInIframe().click();
});

When('I click out of controlled input', () => {
  controlledLabel().click();
});

When('I select value {string}', (text) => {
  simpleSelectID().type(`${text}{enter}`);
});

When('I type {string} into input', (text) => {
  simpleSelectID().type(text);
});

When('Type {string} text into multi select input and select the value', (text) => {
  simpleSelectID().type(`${text}{downarrow}{enter}`);
});

When('I type {string} into basic input', (text) => {
  simpleSelectIframe().type(text);
});

When('{string} option on Select list is {string}', (position, text) => {
  selectOption(positionOfElement(position)).should('have.text', text);
});

When('I click on {string} option on Select list', (position) => {
  selectOption(positionOfElement(position)).click();
});

When('I click on {string} option on Select list in iframe', (position) => {
  selectOptionInIframe(positionOfElement(position)).click();
});

When('I click on Select label', () => {
  label().click();
});
