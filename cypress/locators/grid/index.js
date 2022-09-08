import { POD_DATA_COMPONENT } from "../pod/locators";
import GRID_COMPONENT from "./locators";

export const pod = (index) => cy.get(POD_DATA_COMPONENT).eq(index);
export const gridItem = (index) => cy.get(GRID_COMPONENT).children().eq(index);
export const gridComponent = () => cy.get(GRID_COMPONENT);
