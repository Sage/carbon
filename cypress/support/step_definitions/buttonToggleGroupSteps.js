import { helpIcon, labelPreview, labelHelpInput } from "../../locators/commonLocators";
import { inputWidthInput, inputWidthPreview, fieldHelpInput, fieldHelpPreview, labelHelpPreview } from "../../locators/buttonToggleGroupLocators";

Given('I open Button Toggle Group component page', () => {
  cy.visit(Cypress.env('button_toggle_group_component_url'));
});

Then('Label on preview is {string}', (label) => {
  labelPreview().should('have.text', label)
});

When('I set label help to {string}', (labelHelp) => {
  labelHelpInput().clear().type(labelHelp)
})

When('I hover mouse on help icon', () => {
  helpIcon().trigger('mouseover')
});

When('I set input width to {string}', (width) => {
  inputWidthInput().clear().type(width)
})

Then('Width is set to {string}', (width) => {
  inputWidthPreview().should('have.attr', 'style').should('contain', `width: ${width}%`)
})

Then('Width is not set', () => {
  inputWidthPreview().should('not.have.attr', 'style')
})

When('I set field help to {string}', (width) => {
  fieldHelpInput().clear().type(width)
})

Then('Field help on preview is set to {string}', (text) => {
  fieldHelpPreview().should('have.text', text)
})

Then('Label help on preview is set to {string}', (text) => {
  labelHelpPreview().should('have.text', text)
})
