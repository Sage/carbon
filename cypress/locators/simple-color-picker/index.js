import { SIMPLE_COLOR_PICKER_PREVIEW } from './locators';

// component preview locators
export const simpleColorPickerPreview = () => cy.iFrame(SIMPLE_COLOR_PICKER_PREVIEW);
export const simpleColorPickerInput = index => cy.iFrame(SIMPLE_COLOR_PICKER_PREVIEW)
  .find(`li:nth-child(${index}) > div > input`);
export const simpleColorPickerDiv = index => cy.iFrame(SIMPLE_COLOR_PICKER_PREVIEW)
  .find(`li:nth-child(${index}) > div > div`);
