import { SINGLE_TILE_SELECT_ID, TILE_SELECT_DATA_COMPONENT, SINGLE_SELECT_TILE_SELECT_ID } from './locators';

export const singleTileSelectID = () => cy.iFrame(SINGLE_TILE_SELECT_ID);
export const tileSelectDataComponent = () => singleTileSelectID().find(TILE_SELECT_DATA_COMPONENT);
export const singleTileSelectInput = () => singleTileSelectID().find('input');
export const deselectButton = () => tileSelectDataComponent().find('button');
export const disabledTileSelect = () => cy.iFrame(SINGLE_SELECT_TILE_SELECT_ID)
  .find(TILE_SELECT_DATA_COMPONENT).eq(2).find('input');
