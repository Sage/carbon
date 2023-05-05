import {
  ADVANCED_COLOR_PICKER_CELL,
  CURRENT_COLOR_DESCRIPTION,
  SIMPLE_COLOR,
  SIMPLE_COLOR_PICKER,
  ADVANCED_COLOR_PREVIEW,
} from "./locators";

export const simpleColorPickerInput = (index) =>
  cy.get(SIMPLE_COLOR).find("input").eq(index);
export const simpleColorPicker = (index) =>
  cy.get(SIMPLE_COLOR_PICKER).find(SIMPLE_COLOR).eq(index).find("input");
export const currentColorDescription = () => cy.get(CURRENT_COLOR_DESCRIPTION);
export const advancedColorPickerCell = () => cy.get(ADVANCED_COLOR_PICKER_CELL);
export const advancedColorPicker = (index) => {
  return cy.get(SIMPLE_COLOR).eq(index);
};
export const simpleColorPickerComponent = () => cy.get(SIMPLE_COLOR_PICKER);
export const advancedColorPickerPreview = () => cy.get(ADVANCED_COLOR_PREVIEW);
