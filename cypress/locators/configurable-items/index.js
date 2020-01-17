import { ITEMS_WRAPPER } from './locators';
import { LABEL } from '../locators';

// component preview locators
export const draggableItemByText = text => cy.get(LABEL)
  .contains(text).parent().parent()
  .find('.icon-drag_vertical');
export const draggableItemByPosition = position => cy.get(ITEMS_WRAPPER)
  .find(`div:nth-child(${position})`)
  .find('li[data-element="configurable-item-row"] > div[data-element="configurable-item-row-content-wrapper"]')
  .find('label');
