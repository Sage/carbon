import { SIMPLE_COLOR_PICKER_PREVIEW, EXPERIMENTAL_SIMPLE_COLOR_PICKER, EXPERIMENTAL_SIMPLE_COLOR } from './locators';

// component preview locators
export const simpleColorPickerPreview = () => cy.iFrame(SIMPLE_COLOR_PICKER_PREVIEW);
export const simpleColorPickerInput = index => cy.iFrame(SIMPLE_COLOR_PICKER_PREVIEW)
  .find(`li:nth-child(${index}) > div > input`);
export const simpleColorPickerDiv = index => cy.iFrame(SIMPLE_COLOR_PICKER_PREVIEW)
  .find(`li:nth-child(${index}) > div > div > span`);
export const experimentalSimpleColorPickerInput = index => cy.iFrame(
  EXPERIMENTAL_SIMPLE_COLOR_PICKER,
).find(`${EXPERIMENTAL_SIMPLE_COLOR}:nth-child(${index}) > input`);
