import { iget } from "../support/helper";

const STORYBOOK_PREVIEW = '#storybook-preview-iframe'
const CHILDREN_TEXTAREA = '#children'
const FORM = 'form'

export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA);
export const disabledCheckbox = () => cy.get(FORM).contains('disabled').find('input')
export const themeSelect = () => cy.get(FORM).contains('theme').find('select')
export const buttonPreview = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), "#story-root > button"); })
export const buttonSubtextPreview = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), '.carbon-button__subtext'); })
