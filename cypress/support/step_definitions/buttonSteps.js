import { disabledCheckbox, themeSelect, buttonSubtextPreview } from "../../locators/buttonLocators";
import { buttonPreview } from "../../locators/commonLocators";

const CARBON_BUTTON_PREFIX = 'carbon-button--';

Given('I open Button component page', () => {
  cy.visit(Cypress.env('button_component_url'));
});

Then('Button label on preview is {string}', (label) => {
  buttonPreview().should('have.text', label)
});

When('I disable Button', () => {
  disabledCheckbox().check();
});

Then('Button is disabled', () => {
  buttonPreview().should('be.disabled')
});

When('I enable Button', () => {
  disabledCheckbox().uncheck();
});

Then('Button is enabled', () => {
  buttonPreview().should('be.enabled')
});

When('I set Button theme property to {string}', (theme) => {
  themeSelect().select(theme)
});

When('I type {string} to Button theme property', (theme) => {
  themeSelect().type(theme)
});

Then('Button theme property on preview is {string}', (theme) => {
  buttonPreview().should('have.class', CARBON_BUTTON_PREFIX + theme)
});

Then('Button size property on preview is {string}', (size) => {
  buttonPreview().should('have.class', CARBON_BUTTON_PREFIX + size)
});

Then('Button subtext on preview is {string}', (subtext) => {
  buttonSubtextPreview().should('have.text', subtext)
});

Then('Button as property on preview is {string}', (as) => {
  buttonPreview().should('have.class', CARBON_BUTTON_PREFIX + as)
});
