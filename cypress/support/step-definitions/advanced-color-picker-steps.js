import {
  experimentalSimpleColorPickerInput,
  advancedColorPickerCell,
} from '../../locators/advanced-color-picker';

const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;

When('I open Advanced Color Picker', () => {
  advancedColorPickerCell().first().click();
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

When('I press {string} on a {int} color in advanced colorpicker', (arrow, index) => {
  switch (arrow) {
    case 'ArrowDown':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: arrow, keyCode: 40, which: 40 });
      break;
    case 'ArrowUp':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: arrow, keyCode: 38, which: 38 });
      break;
    case 'ArrowRight':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: arrow, keyCode: 39, which: 39 });
      break;
    case 'ArrowLeft':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: arrow, keyCode: 37, which: 37 });
      break;
    default: throw new Error('Could not press that arrow key');
  }
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
