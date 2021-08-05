import {
  SIMPLE_COLOR_PICKER_PREVIEW,
  EXPERIMENTAL_SIMPLE_COLOR_PICKER,
  EXPERIMENTAL_SIMPLE_COLOR,
} from "./locators";

// component preview locators
export const simpleColorPickerDiv = (index) =>
  cy
    .iFrame(SIMPLE_COLOR_PICKER_PREVIEW)
    .find(`li:nth-child(${index}) > div > div > span`);
export const experimentalSimpleColorPickerInput = (index) =>
  cy
    .iFrame(EXPERIMENTAL_SIMPLE_COLOR_PICKER)
    .find(`${EXPERIMENTAL_SIMPLE_COLOR}:nth-child(${index}) > input`);
export const simpleColorPickerLegend = () =>
  cy.get(EXPERIMENTAL_SIMPLE_COLOR_PICKER).find("legend");
