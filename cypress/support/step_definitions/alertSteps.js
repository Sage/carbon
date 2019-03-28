import {
  titleInput, openAlertButton, alertTitle, alertDialog, closeIconButton, backgroundBlocker,
  enableBackgroundUICheckbox, disableEscKeyCheckbox, subtitleInput, alertSubtitle, alertChildren, showCloseIconCheckbox
} from "../../locators/alertLocators";

const CARBON_DIALOG_PREFIX = 'carbon-dialog__dialog--'

Then('Alert dialog is visible', () => {
  alertDialog().should('be.visible')
})

When('I click close icon', () => {
  closeIconButton().click();
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
  openAlertButton().click()
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
  enableBackgroundUICheckbox().uncheck({ force: true })
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
  disableEscKeyCheckbox().uncheck({ force: true })
})

When('I hit ESC key', () => {
  alertDialog().type('{esc}')
})

Then('Alert dialog height is set to {string}', (height) => {
  alertDialog().should('have.attr', 'style').should('contain', `min-height: ${height}px`)
})

Then('Alert dialog height is NOT set to {string}', (height) => {
  alertDialog().should('have.attr', 'style').should('not.contain', `min-height: ${height}px`)
})

When('I enable showCloseIcon', () => {
  showCloseIconCheckbox().check({ force: true })
})

When('I disable showCloseIcon', () => {
  showCloseIconCheckbox().uncheck({ force: true })
})

Then('CloseIcon is visible', () => {
  closeIconButton().should('be.visible')
})

Then('I click CloseIcon', () => {
  closeIconButton().click()
})

Then('CloseIcon is not visible', () => {
  closeIconButton().should('not.be.visible')
})

Then('Alert size property on preview is {string}', (size) => {
  alertDialog().should('have.class', CARBON_DIALOG_PREFIX + size)
});