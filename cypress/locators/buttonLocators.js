import { iget } from "../support/helper";

const STORYBOOK_PREVIEW = '#storybook-preview-iframe'

const FORM = 'form'

export const disabledCheckbox = () => cy.get(FORM).contains('disabled').find('input')
export const themeSelect = () => cy.get(FORM).contains('theme').find('select')
export const buttonSubtextPreview = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), '.carbon-button__subtext'); })
