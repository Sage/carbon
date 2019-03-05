import { demoButton, demoButtonSubtext, subtextInput, sizeInput, childrenTextArea } from "../../locators/buttonLocators";

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

When('I set size to {string}', (size) => {
  sizeInput().type(size + '{enter}');
});

Then('Button subtext on preview is {string}', (subtext) => {
  demoButtonSubtext().should('have.text', subtext);
});
