import LOADER from "./locators";
import { BUTTON_DATA_COMPONENT_PREVIEW } from "../button/locators";

export const loader = (index) => cy.get(LOADER).find("div").eq(index);
export const loaderInsideButton = () => cy.get(BUTTON_DATA_COMPONENT_PREVIEW);
