import {
  buttonToggleLabelPreview, buttonIconSelect, buttonToggleIconNamePreview,
  buttonIconSizeSelect, buttonToggleIconPreview, buttonTogglePreview, buttonToggleGroupedCheckbox
} from "../../locators/buttonToggleLocators";

const BUTTON_TOGGLE_ICON_CLASS = 'carbon-button-toggle__button-icon'
const BUTTON_TOGGLE_CLASS = 'carbon-button-toggle'

Given('I open Button Toggle component page', () => {
  cy.visit(Cypress.env('button_toggle_url'));
})

Then('Button Toggle label on preview is {string}', (label) => {
  buttonToggleLabelPreview().should('have.text', label)
})

When('I set button icon to {string}', (iconName) => {
  buttonIconSelect().select(iconName)
})

Then('Button icon on preview is {string}', (iconName) => {
  buttonToggleIconNamePreview()
    // .should('have.class', "icon-" + iconName) //probably old solutuon?
    .should('have.attr', 'data-element', iconName)
})

When('I set button icon size to {string}', (size) => {
  buttonIconSizeSelect().select(size)
})

Then('Button icon size on preview is {string}', (size) => {
  if (size == 'small') {
    //small is default property that's why it's absent inside class
    buttonToggleIconPreview().should('not.have.class', BUTTON_TOGGLE_ICON_CLASS + '--' + size)
  } else {
    buttonToggleIconPreview().should('have.class', BUTTON_TOGGLE_ICON_CLASS + '--' + size)
  }
})

Then('Button icon not exists on preview', () => {
  buttonToggleIconNamePreview().should('not.exist')
})

Then('Button Toggle size on preview is {string}', (size) => {
  buttonTogglePreview().should('have.class', BUTTON_TOGGLE_CLASS + '--' + size)
})

Then('Button Toggle is disabled', () => {
  buttonTogglePreview().should('have.class', 'common-input--disabled')
  buttonToggleLabelPreview().should('have.class', 'carbon-button-toggle__label--disabled')
})

Then('Button Toggle is enabled', () => {
  buttonTogglePreview().should('not.have.class', 'common-input--disabled')
  buttonToggleLabelPreview().should('not.have.class', 'carbon-button-toggle__label--disabled')
})

When('I check grouped', () => {
  buttonToggleGroupedCheckbox().check()
})

When('I uncheck grouped', () => {
  buttonToggleGroupedCheckbox().uncheck()
})

Then('Button Toggle is grouped', () => {
  buttonTogglePreview().should('have.class', BUTTON_TOGGLE_CLASS + '--grouped')
})

Then('Button Toggle is not grouped', () => {
  buttonTogglePreview().should('not.have.class', BUTTON_TOGGLE_CLASS + '--grouped')
})