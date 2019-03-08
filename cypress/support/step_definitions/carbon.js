import { demoButton, demoButtonSubtext, subtextInput, sizeInput, childrenTextArea, asInput, disabledCheckbox, themeInput, noResultsDropdown } from "../../locators/buttonLocators";

const CARBON_BUTTON_PREFIX = 'carbon-button--';

Given('I open Carbon page', () => {
  cy.visit(Cypress.env('carbon_url'));
});

Then('I see {string} in the title', (title) => {
  cy.title().should('include', title);
});

Given('I open Button component page', () => {
  cy.visit(Cypress.env('button_component_url'));
});

When('I set children to {string}', (text) => {
  childrenTextArea().clear().type(text);
});

Then('Button label on preview is {string}', (label) => {
  demoButton().should('have.text', label);
});

When('I set Button subtext to {string}', (subtext) => {
  subtextInput().clear().type(subtext);
});

When('I set Button size to {string}', (size) => {
  sizeInput().type(size + '{enter}');
});

When('I type {string} to Button size', (size) => {
  sizeInput().type(size);
});

Then('Button subtext on preview is {string}', (subtext) => {
  demoButtonSubtext().should('have.text', subtext);
});

When('I set as property to {string}', (asProperty) => {
  asInput().type(asProperty + '{enter}');
});

When('I type {string} to as property', (asProperty) => {
  asInput().type(asProperty);
});

Then('Button as property on preview is {string}', (asProperty) => {
  demoButton().should('have.class', CARBON_BUTTON_PREFIX + asProperty)
});

Then('I see {string} {string} for results', (text, asProperty) => {
  noResultsDropdown().should('have.text', `${text} "${asProperty}"`)
});

When('I disable Button', () => {
  disabledCheckbox().check();
});

Then('Button is disabled', () => {
  demoButton().should('be.disabled')
});

When('I enable Button', () => {
  disabledCheckbox().uncheck();
});

Then('Button is enabled', () => {
  demoButton().should('be.enabled')
});

When('I set Button theme property to {string}', (theme) => {
  themeInput().type(theme + '{enter}')
});

When('I type {string} to Button theme property', (theme) => {
  themeInput().type(theme)
});


Then('Button theme property on preview is {string}', (theme) => {
  demoButton().should('have.class', CARBON_BUTTON_PREFIX + theme)
});

Then('Button size property on preview is {string}', (size) => {
  demoButton().should('have.class', CARBON_BUTTON_PREFIX + size)
});


