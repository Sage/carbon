import {
  closeIconButton, alertChildren, showCloseIconCheckbox,
  dialogPreview, stickyFormFooter, disableEscKeyCheckbox, backgroundBlocker
} from "../../locators/alertDialogLocators"
import {
  enableBackgroundUICheckbox, subtitleInput, STORY_ROOT
} from "../../locators/commonLocators"

const CARBON_DIALOG_PREFIX = 'carbon-dialog__dialog--'

When('I click close icon', () => {
  closeIconButton().click();
})

When('I set subtitle to {string}', (subtitle) => {
  subtitleInput().clear().type(subtitle)
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
  dialogPreview().type('{esc}')
})

Then('Dialog height is set to {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('contain', `min-height: ${height}px`)
})

Then('Dialog height is not set to {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('not.contain', `min-height: ${height}px`)
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

Then('Dialog size property on preview is {string}', (size) => {
  dialogPreview().should('have.class', CARBON_DIALOG_PREFIX + size)
});

Then('Alert children on preview is {string}', (children) => {
  alertChildren().should('have.text', children)
})

Then('dialog is visible', () => {
  dialogPreview().should('be.visible')
})

Then('dialog is not visible', () => {
  dialogPreview().should('not.exist')
})

When('I enable stickyFormFooter', () => {
  stickyFormFooter().check()
})

When('I disable stickyFormFooter', () => {
  stickyFormFooter().uncheck()
})

Then('stickyFormFooter is enabled', () => {
  dialogPreview().should('have.class', CARBON_DIALOG_PREFIX + 'sticky-form-footer')
})

Then('stickyFormFooter is disabled', () => {
  dialogPreview().should('not.have.class', CARBON_DIALOG_PREFIX + 'sticky-form-footer')
})

When('I click on {string} outside dialog', (position) => {
  cy.iFrame(STORY_ROOT).click(position, { force: true })
})

When('I click on background {string} outside dialog', (position) => {
  backgroundBlocker().click(position, { force: true })
})
