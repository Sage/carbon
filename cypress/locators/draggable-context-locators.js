export const draggableRecordByText = text => cy.get('.carbon-table-cell').contains(text).parent().find('.draggable-table-cell__icon');
export const draggableRecordByPosition = position => cy.get('tbody').find(`:nth-child(${position}) > td`);
