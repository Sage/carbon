import { ITEMS_WRAPPER, ITEMS_ICON } from './locators';
import { LABEL } from '../locators';

// component preview locators
export const draggableItemByText = text => cy.get(LABEL)
  .contains(text).parent().parent()
  .parent()
  .parent()
  .parent()
  .find(ITEMS_ICON);
export const draggableItemByTextNoIframe = text => cy.iFrame(LABEL)
  .contains(text).parent().parent()
  .parent()
  .parent()
  .parent()
  .find(ITEMS_ICON);
export const draggableItemByPosition = position => cy.get(ITEMS_WRAPPER)
  .find(`div:nth-child(${position})`)
  .find('li[data-element="configurable-item-row"] > div[data-element="configurable-item-row-content-wrapper"]')
  .find('label');
export const draggableItemByPositionNoIframe = position => cy.iFrame(ITEMS_WRAPPER)
  .find(`div:nth-child(${position})`)
  .find('li[data-element="configurable-item-row"] > div[data-element="configurable-item-row-content-wrapper"]')
  .find('label');
