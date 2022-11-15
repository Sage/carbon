import {
  TILE_SELECT_DATA_COMPONENT,
  TILE_SELECT_LEGEND_STYLE,
} from "./locators";

export const tileSelectDataComponent = () => cy.get(TILE_SELECT_DATA_COMPONENT);
export const singleTileSelectInput = () =>
  tileSelectDataComponent().find("input");
export const deselectButton = () => tileSelectDataComponent().find("button");

export const tileSelectchildren = () =>
  tileSelectDataComponent().find("div:nth-child(1)");

export const titleElement = () => tileSelectchildren().find("h3");

export const subtitleElement = () => tileSelectchildren().find("h4");

export const descElement = () => tileSelectchildren().find("p");

export const inputElement = () => tileSelectchildren().find(" input");

export const disabledElement = () => tileSelectDataComponent().find("div");

export const legendStyleComponent = () =>
  cy.get(TILE_SELECT_LEGEND_STYLE).children();
