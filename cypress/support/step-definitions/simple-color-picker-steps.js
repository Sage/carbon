import { simpleColorPickerInput, simpleColorPickerDiv, simpleColorPickerPreview } from '../../locators/simple-color-picker';

const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;
const THIRD_ELEMENT = 3;

Then('Simple Color Picker name on preview is set to {string}', (value) => {
  simpleColorPickerInput(FIRST_ELEMENT)
    .should('have.attr', 'name', `${value}`);
  simpleColorPickerInput(SECOND_ELEMENT)
    .should('have.attr', 'name', `${value}`);
  simpleColorPickerInput(THIRD_ELEMENT)
    .should('have.attr', 'name', `${value}`);
});

Then('Simple Color Picker availableColors on preview is set to {string} with rgb {string} parameter', (color, rgb) => {
  const colorArray = color.split(',');
  const rgbArray = rgb.split(';');

  colorArray.forEach((entry) => {
    simpleColorPickerInput(colorArray.indexOf(entry) + 1)
      .should('have.attr', 'value', entry);
    simpleColorPickerDiv(colorArray.indexOf(entry) + 1)
      .should('have.css', 'background-color', rgbArray[colorArray.indexOf(entry)]);
  });
});

Then('Simple Color Picker availableColors on preview is set to {string}', (value) => {
  simpleColorPickerPreview().children()
    .should('have.length', `${value}`);
});

Then('Simple Color Picker {int} element was picked up', (index) => {
  for (let i = 1; i < index; ++i) {
    simpleColorPickerDiv(i + 1).children()
      .should('have.attr', 'data-element', 'tick')
      .should('have.class', 'icon-tick');
  }
});

When('I pick {int} color', (index) => {
  if (index === 1) {
    simpleColorPickerInput(SECOND_ELEMENT).click();
    simpleColorPickerInput(FIRST_ELEMENT).click();
  }
  for (let i = 0; i < index; ++i) {
    simpleColorPickerInput(i + 1).click();
  }
});
