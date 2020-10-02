import { DRAGGABLE_ITEM, DRAG_ICON } from './locators';

export const draggableItem = text => cy.get(DRAGGABLE_ITEM)
  .contains(`Draggable Label ${text}`)
  .parent()
  .parent()
  .parent()
  .parent()
  .parent()
  .parent()
  .find(DRAG_ICON);

export const draggableItemByPosition = index => cy.get(DRAGGABLE_ITEM)
  .parent()
  .find(`div:nth-child(${index})`)
  .find('label')
  .eq(index === 1 ? 1 : 0);
