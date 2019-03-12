const FORM = 'form'
const HEIGHT_INPUT = '#height'
const CHILDREN_TEXTAREA = '#children'

export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA);
export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea')
export const asSelect = () => cy.get(FORM).contains('as').find('select')
export const heightInput = () => cy.get(HEIGHT_INPUT)
