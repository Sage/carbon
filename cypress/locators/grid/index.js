import GRID_COMPONENT from "./locators";

export const gridItem = (index) => cy.get(GRID_COMPONENT).children().eq(index);
export const gridContainer = () => cy.get(GRID_COMPONENT);
