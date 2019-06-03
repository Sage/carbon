import { simpleColorPickerInput, simpleColorPickerDiv, simpleColorPickerPreview } from '../../locators/simple-color-picker';

const ZERO_ELEMENT = 0;
const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;
const THIRD_ELEMENT = 3;

Then('Simple Color Picker name on preview is set to {string}', (value) => {
  simpleColorPickerInput(FIRST_ELEMENT)
    .should('have.attr', 'name', `${value}`)
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'opacity', '0')
    .and('have.css', 'height', '56px')
    .and('have.css', 'width', '56px');
  simpleColorPickerInput(SECOND_ELEMENT)
    .should('have.attr', 'name', `${value}`)
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'opacity', '0')
    .and('have.css', 'height', '56px')
    .and('have.css', 'width', '56px');
  simpleColorPickerInput(THIRD_ELEMENT)
    .should('have.attr', 'name', `${value}`)
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'opacity', '0')
    .and('have.css', 'height', '56px')
    .and('have.css', 'width', '56px');
});

Then('Simple Color Picker availableColors on preview is set to {string} with rgb {string} parameter', (color, rgb) => {
  const firstColor = color.split(',')[ZERO_ELEMENT];
  const secondColor = color.split(',')[FIRST_ELEMENT];
  const thirdColor = color.split(',')[SECOND_ELEMENT];

  const firstRgb = rgb.split(';')[ZERO_ELEMENT];
  const secondRgb = rgb.split(';')[FIRST_ELEMENT];
  const thirdRgb = rgb.split(';')[SECOND_ELEMENT];

  simpleColorPickerInput(FIRST_ELEMENT)
    .should('have.attr', 'value', `${firstColor}`)
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'opacity', '0')
    .and('have.css', 'height', '56px')
    .and('have.css', 'width', '56px');
  simpleColorPickerDiv(FIRST_ELEMENT)
    .should('have.css', 'background-color', `${firstRgb}`);

  simpleColorPickerInput(SECOND_ELEMENT)
    .should('have.attr', 'value', `${secondColor}`)
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'opacity', '0')
    .and('have.css', 'height', '56px')
    .and('have.css', 'width', '56px');
  simpleColorPickerDiv(SECOND_ELEMENT)
    .should('have.css', 'background-color', `${secondRgb}`);

  simpleColorPickerInput(THIRD_ELEMENT)
    .should('have.attr', 'value', `${thirdColor}`)
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'opacity', '0')
    .and('have.css', 'height', '56px')
    .and('have.css', 'width', '56px');
  simpleColorPickerDiv(THIRD_ELEMENT)
    .should('have.css', 'background-color', `${thirdRgb}`);
});

Then('Simple Color Picker availableColors on preview is set to {string}', (value) => {
  simpleColorPickerPreview().children()
    .should('have.length', `${value}`);
});

Then('Simple Color Picker {string} element was selected', (index) => {
  switch (index) {
    case 'first':
      simpleColorPickerInput(SECOND_ELEMENT).click();
      simpleColorPickerInput(FIRST_ELEMENT).click();
      simpleColorPickerDiv(FIRST_ELEMENT).children()
        .should('have.attr', 'data-element', 'tick')
        .should('have.class', 'icon-tick');
      break;
    case 'second':
      simpleColorPickerDiv(SECOND_ELEMENT).children()
        .should('have.attr', 'data-element', 'tick')
        .should('have.class', 'icon-tick');
      break;
    case 'third':
      simpleColorPickerDiv(THIRD_ELEMENT).children()
        .should('have.attr', 'data-element', 'tick')
        .should('have.class', 'icon-tick');
      break;
    default: throw new Error('There is no such index of element');
  }
});

When('I click onto {string} element', (index) => {
  switch (index) {
    case 'first':
      simpleColorPickerInput(FIRST_ELEMENT).click();
      break;
    case 'second':
      simpleColorPickerInput(SECOND_ELEMENT).click();
      break;
    case 'third':
      simpleColorPickerInput(THIRD_ELEMENT).click();
      break;
    default: throw new Error('There is no such index of element');
  }
});
