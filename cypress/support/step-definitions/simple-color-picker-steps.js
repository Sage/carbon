import {
  simpleColorPickerInput,
  simpleColorPickerDiv,
  simpleColorPickerPreview,
  experimentalSimpleColorPickerInput,
} from '../../locators/simple-color-picker';
import { getKnobsInput } from '../../locators';
import { keyCode, positionOfElement } from '../helper';

Then('Simple Color Picker name on preview is set to {string}', (value) => {
  simpleColorPickerInput(positionOfElement('second'))
    .should('have.attr', 'name', `${value}`);
  simpleColorPickerInput(positionOfElement('third'))
    .should('have.attr', 'name', `${value}`);
  simpleColorPickerInput(positionOfElement('fourth'))
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
  cy.wait(500);
  for (let i = 1; i < index; ++i) {
    simpleColorPickerDiv(i + 1).should('have.attr', 'data-element', 'tick')
      .and('have.attr', 'data-component', 'icon');
  }
});

When('I pick {int} color', (index) => {
  if (index === 1) {
    simpleColorPickerInput(positionOfElement('third')).click();
    simpleColorPickerInput(positionOfElement('second')).click();
  }
  for (let i = 0; i < index; ++i) {
    simpleColorPickerInput(i + 1).click();
  }
});

When('I pick {int} simple color input', (index) => {
  for (let i = 0; i < index; ++i) {
    experimentalSimpleColorPickerInput(i + 1).click();
  }
});

Then('Experimental Simple Color Picker {int} element was picked up', (index) => {
  experimentalSimpleColorPickerInput(index).should('have.attr', 'aria-checked', 'true');
});

When('I select {int} color', (index) => {
  experimentalSimpleColorPickerInput(index).click();
});

When('I press {word} on the {int} color', (key, index) => {
  experimentalSimpleColorPickerInput(index).trigger('keydown', keyCode(key));
});

Then('It renders with all colors', () => {
  cy.fixture('simpleColorPicker.json').then(($json) => {
    for (let i = 0; i < $json.length; ++i) {
      experimentalSimpleColorPickerInput(i + 1).should('have.value', $json[i].color)
        .and('have.attr', 'aria-label', $json[i].label);
    }
  });
});

When('I input new color json into {string} input field', (inputFieldName) => {
  cy.fixture('simpleColorPickerNew.json').then(($json) => {
    getKnobsInput(inputFieldName).clear({ force: true })
      .then($selector => $selector.val(JSON.stringify($json)))
      .type(' ');
  });
});

Then('It renders with all new colors', () => {
  cy.fixture('simpleColorPickerNew.json').then(($json) => {
    for (let i = 0; i < $json.length; ++i) {
      experimentalSimpleColorPickerInput(i + 1).should('have.value', $json[i].color)
        .and('have.attr', 'aria-label', $json[i].label);
    }
  });
});
