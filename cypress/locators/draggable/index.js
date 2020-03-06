import { DRAGGABLE_ITEM } from './locators';

export const draggableItem = text => cy.get(DRAGGABLE_ITEM)
  .contains(`Draggable Label ${text}`)
  .parent()
  .parent()
  .parent()
  .parent()
  .parent()
  .parent()
  .find('[data-element="draggable"]')
  .first();

export const draggableItemByPosition = index => cy.get(DRAGGABLE_ITEM)
  .parent()
  .find(`div:nth-child(${index})`)
  .find('label');
