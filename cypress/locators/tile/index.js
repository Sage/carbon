import { TILE, TILE_FOOTER } from "./locators";

// component preview locators
export const tile = () => cy.get(TILE);
export const tileFooter = () => cy.get(TILE_FOOTER);
