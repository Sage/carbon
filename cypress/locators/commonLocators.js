import { iget } from "../support/helper";

const HEIGHT_INPUT = '#height'
const CHILDREN_TEXTAREA = '#children'
const LABEL_INPUT = "#label"

export const FORM = 'form'
export const STORYBOOK_PREVIEW = '#storybook-preview-iframe'
export const STORYBOOK_BUTTON_PREVIEW = "#story-root > button"

export const labelInput = () => cy.get(LABEL_INPUT)
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA)
export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea')
export const asSelect = () => cy.get(FORM).contains('as').find('select')
export const heightInput = () => cy.get(HEIGHT_INPUT)

export const buttonPreview = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), STORYBOOK_BUTTON_PREVIEW); })
