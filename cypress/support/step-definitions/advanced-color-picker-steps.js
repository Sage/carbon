import {
  experimentalSimpleColorPickerInput,
  advancedColorPickerCell,
  experimentalSimpleColorPickerInputNoIframe,
  advancedColorPickerCellNoIframe,
} from '../../locators/advanced-color-picker';

const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;

When('I open Advanced Color Picker', () => {
  advancedColorPickerCell().first().click();
});

When('I open Advanced Color Picker in noIFrame', () => {
  advancedColorPickerCellNoIframe().first().click();
});

When('I pick simple {int} color', (index) => {
  if (index === 1) {
    experimentalSimpleColorPickerInput(SECOND_ELEMENT).click();
    experimentalSimpleColorPickerInput(FIRST_ELEMENT).click();
  }
  for (let i = 0; i < index; ++i) {
    experimentalSimpleColorPickerInput(i + 1).click();
  }
});

Then('Simple Color {int} has focus', (index) => {
  experimentalSimpleColorPickerInput(index).should('have.focus');
});

Then('Simple Color {int} element was picked up', (index) => {
  experimentalSimpleColorPickerInput(index).should('have.attr', 'aria-checked', 'true');
});

Then('Simple Color {int} element was picked up in noIframe', (index) => {
  experimentalSimpleColorPickerInputNoIframe(index).should('have.attr', 'aria-checked', 'true');
});

When('I press Enter on {int} element', (index) => {
  experimentalSimpleColorPickerInput(index).trigger('keydown', { key: 'Enter', keyCode: 13, which: 13 });
});

When('I press Space on {int} element', (index) => {
  experimentalSimpleColorPickerInput(index).trigger('keydown', { key: 'Space', keyCode: 32, which: 32 });
});

When('I press Tab on {int} element', (index) => {
  experimentalSimpleColorPickerInput(index).trigger('keydown', { key: 'Tab', keyCode: 9, which: 9 });
});

Then('Advanced Simple Color is visible', () => {
  advancedColorPickerCell().should('be.visible');
});
