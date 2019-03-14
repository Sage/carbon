import { FORM } from "./commonLocators";

const BUTTON_SUBTEXT_INPUT = '.carbon-button__subtext'

export const disabledCheckbox = () => cy.get(FORM).contains('disabled').find('input')
export const themeSelect = () => cy.get(FORM).contains('theme').find('select')
export const buttonSubtextPreview = () => cy.iFrame(BUTTON_SUBTEXT_INPUT)
