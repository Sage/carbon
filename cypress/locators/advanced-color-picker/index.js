import {
  ADVANCED_COLOR_PICKER_CELL,
  SIMPLE_COLOR,
} from './locators';

export const experimentalSimpleColorPickerInput = index => cy.iFrame(
  SIMPLE_COLOR,
).find('input').eq(index);
export const advancedColorPickerCell = () => cy.iFrame(ADVANCED_COLOR_PICKER_CELL);
