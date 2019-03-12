const FORM = 'form'

export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea');
export const asSelect = () => cy.get(FORM).contains('as').find('select')

function iget(doc, selector) { return cy.wrap(doc.find(selector)); }