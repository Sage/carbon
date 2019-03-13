import { iget } from "../support/helper";
import { FORM, STORYBOOK_PREVIEW } from "./commonLocators";

const BUTTON_SUBTEXT_INPUT = '.carbon-button__subtext'

export const disabledCheckbox = () => cy.get(FORM).contains('disabled').find('input')
export const themeSelect = () => cy.get(FORM).contains('theme').find('select')
export const buttonSubtextPreview = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), BUTTON_SUBTEXT_INPUT); })
