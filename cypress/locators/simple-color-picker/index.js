import { EXPERIMENTAL_SIMPLE_COLOR_PICKER } from "./locators";

// component preview locators
export const simpleColorPickerLegend = () =>
  cy.get(EXPERIMENTAL_SIMPLE_COLOR_PICKER).find("legend");

export default { simpleColorPickerLegend };
