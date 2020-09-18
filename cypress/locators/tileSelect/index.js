import { SINGLE_TILE_SELECT_ID, TILE_SELECT_DATA_COMPONENT } from './locators';

export const singleTileSelectID = () => cy.iFrame(SINGLE_TILE_SELECT_ID);
export const tileSelectDataComponent = () => singleTileSelectID().find(TILE_SELECT_DATA_COMPONENT);
export const singleTileSelectInput = () => singleTileSelectID().find('input');
export const deselectButton = () => tileSelectDataComponent().find('button');
