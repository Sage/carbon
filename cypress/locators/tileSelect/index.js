import { TILE_SELECT_DATA_COMPONENT } from './locators';

export const tileSelectDataComponent = () => cy.get(TILE_SELECT_DATA_COMPONENT);
export const singleTileSelectInput = () => tileSelectDataComponent().find('input');
export const deselectButton = () => tileSelectDataComponent().find('button');
