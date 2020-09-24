import {
  ADVANCED_COLOR_PICKER_CELL,
  SIMPLE_COLOR,
} from './locators';

export const experimentalSimpleColorPickerInputInIframe = index => cy.iFrame(
  SIMPLE_COLOR,
).find('input').eq(index);
export const experimentalSimpleColorPickerInput = index => cy.get(
  SIMPLE_COLOR,
).find('input').eq(index);
export const advancedColorPickerCell = () => cy.get(ADVANCED_COLOR_PICKER_CELL);
