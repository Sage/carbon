import { helpIcon, labelPreview, labelHelpInput } from "../../locators/commonLocators";
import {
  inputWidthInput, inputWidthPreview, fieldHelpInput,
  fieldHelpPreview, labelHelpPreview, lableInlineCheckbox, buttonToggleGroupPreview, labelAlignInput, labelWidthInput
} from "../../locators/buttonToggleGroupLocators";

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

Then('Input width is set to {string}', (width) => {
  inputWidthPreview().should('have.attr', 'style').should('contain', `width: ${width}%`)
})

Then('Input width is not set', () => {
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

When('I check label inline checkbox', () => {
  lableInlineCheckbox().check()
})

When('I uncheck label inline checkbox', () => {
  lableInlineCheckbox().uncheck()
})

Then('Button Toggle Group component has label-inline property', () => {
  buttonToggleGroupPreview().should('have.class', 'common-input--label-inline')
  labelPreview().should('have.class', 'common-input__label--inline')
  fieldHelpPreview().should('have.class', 'common-input__help-text--inline')
})

Then('Button Toggle Group component do not have label-inline property', () => {
  buttonToggleGroupPreview().should('not.have.class', 'common-input--label-inline')
  labelPreview().should('not.have.class', 'common-input__label--inline')
  fieldHelpPreview().should('not.have.class', 'common-input__help-text--inline')
})

When('I set label align {string}', (direction) => {
  labelAlignInput().type(direction)
})

Then('Button Toggle Group direction on preview is {string}', (direction) => {
  labelPreview().should('have.class', 'common-input__label--align-' + direction)
})

When('I set label width to {string}', (width) => {
  labelWidthInput().clear().type(width)
})

Then('Label width is set to {string}', (width) => {
  labelPreview().should('have.attr', 'style').should('contain', `width: ${width}%`)
})

Then('Label width is not set', () => {
  labelPreview().should('not.have.attr', 'style')
})