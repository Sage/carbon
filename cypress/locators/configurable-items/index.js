export const draggableItemByText = text => cy.get('.common-input__label').contains(text).parent().parent()
  .find('.icon-drag_vertical');
export const draggableItemByPosition = position => cy.get('.carbon-configurable-items__items-wrapper')
  .find(`li:nth-child(${position})`).find('label');
