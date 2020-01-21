import { COMMON_INPUT_LABEL, ITEMS_WRAPPER } from './locators';

// component preview locators
export const draggableItemByText = text => cy.iFrame(COMMON_INPUT_LABEL)
  .contains(text).parent().parent()
  .find('[data-element="drag_vertical"]');
export const draggableItemByPosition = position => cy.iFrame(ITEMS_WRAPPER)
  .find(`div:nth-child(${position})`)
  .find('li[data-element="configurable-item-row"] > div[data-element="configurable-item-row-content-wrapper"]')
  .find('label');
