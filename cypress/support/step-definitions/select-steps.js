import {
  select, selectInput, selectInputNoIframe, selectPill,
} from '../../locators/select';

Then('Select typeAhead is disabled', () => {
  select().should('have.attr', 'placeholder', 'Please Select...');
});

Then('Select typeAhead is enabled', () => {
  select().should('have.attr', 'placeholder', 'Type to Search...');
});

When('Type {string} text into input', (text) => {
  selectInput().clear().type(text);
});

When('Type {string} text into input into iFrame', (text) => {
  selectInputNoIframe().clear().type(text);
});

Then('Select input has {string} value', (text) => {
  selectInput().should('have.attr', 'value', text);
});

Then('Select multiple input {int} element and has {string} value', (index, text) => {
  selectPill(index).should('have.attr', 'title', text);
});

Then('Select placeholder on preview is set to {string}', (text) => {
  select().should('have.attr', 'placeholder', text);
});

Then('Select size on preview is set to {string}', (size) => {
  switch (size) {
    case 'small':
      select().should('have.css', 'min-height', '32px')
        .and('have.css', 'padding-left', '8px')
        .and('have.css', 'padding-right', '8px');
      break;
    case 'medium':
      select().should('have.css', 'min-height', '40px')
        .and('have.css', 'padding-left', '11px')
        .and('have.css', 'padding-right', '11px');
      break;
    case 'large':
      select().should('have.css', 'min-height', '48px')
        .and('have.css', 'padding-left', '13px')
        .and('have.css', 'padding-right', '13px');
      break;
    default: throw new Error('There is no such size for a Select component input');
  }
});

Then('Select size on preview for default component is set to {string}', (size) => {
  switch (size) {
    case 'small':
      select().should('have.css', 'height', '28px')
        .and('have.css', 'width', '1019px');
      break;
    case 'medium':
      select().should('have.css', 'height', '36px')
        .and('have.css', 'width', '1008px');
      break;
    case 'large':
      select().should('have.css', 'height', '44px')
        .and('have.css', 'width', '998px');
      break;
    default: throw new Error('There is no such size for a Select component input');
  }
});

Then('Select is disabled', () => {
  select().should('have.attr', 'disabled');
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

When('Type {string} text into input and select the value', (text) => {
  selectInput().type(`${text}{downarrow}{enter}`);
});

When('Type {string} text into input and select the value into iFrame', (text) => {
  selectInputNoIframe().type(`${text}{downarrow}{enter}`);
});
