import { titleInput, openPreviewButton, alertTitle, openCheckbox, alertDialog, closeIcon, backgroundBlocker, enableBackgroundUICheckbox, disableEscKeyCheckbox, subtitleInput, alertSubtitle, alertChildren } from "../../locators/alertLocators";

Given('I open Alert component page', () => {
  cy.visit(Cypress.env('alert_component_url'))
})

When('I check open checkbox', () => {
  openCheckbox().check();
})

Then('Alert dialog is visible', () => {
  alertDialog().should('be.visible')
})

When('I click close icon', () => {
  closeIcon().click();
})

Then('Alert dialog is not visible', () => {
  alertDialog().should('not.exist')
})

When('I set title to {string}', (title) => {
  titleInput().clear().type(title)
})

When('I set subtitle to {string}', (subtitle) => {
  subtitleInput().clear().type(subtitle)
})

Then('Alert subtitle on preview is {string}', (subtitle) => {
  alertSubtitle().should('have.text', subtitle)
})

When('I open Alert preview', () => {
  openPreviewButton().click()
})

Then('Alert title on preview is {string}', (title) => {
  alertTitle().should('have.text', title)
})

Then('Alert children on preview is {string}', (children) => {
  alertChildren().should('have.text', children)
})

When('I check enableBackgroundUI', () => {
  enableBackgroundUICheckbox().check()
})

When('I uncheck enableBackgroundUI', () => {
  enableBackgroundUICheckbox().uncheck({force:true})
})

Then('Background UI is enabled', () => {
  backgroundBlocker().should('not.exist')
})

Then('Background UI is disabled', () => {
  backgroundBlocker().should('exist')
})

When('I check disableEscKey', () => {
  disableEscKeyCheckbox().check()
})

When('I uncheck disableEscKey', () => {
  disableEscKeyCheckbox().uncheck({force: true})
})

When('I hit ESC key', () => {
  alertDialog().type('{esc}')
})

