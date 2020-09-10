import {
  simpleColorPickerDiv,
  experimentalSimpleColorPickerInput,
  simpleColorPickerLegendNoIFrame,
} from '../../locators/simple-color-picker';
import { getKnobsInput, commonDataElementInputPreviewNoIframe } from '../../locators';
import { keyCode } from '../helper';

Then('Simple Color Picker {int} element was picked up', (index) => {
  cy.wait(500);
  for (let i = 1; i < index; ++i) {
    simpleColorPickerDiv(i + 1).should('have.attr', 'data-element', 'tick')
      .and('have.attr', 'data-component', 'icon');
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

When('simple color picker legend on preview is {word} in NoIFrame', (text) => {
  simpleColorPickerLegendNoIFrame().should('have.text', text);
});

When('simple color picker name {word} in NoIFrame', (name) => {
  commonDataElementInputPreviewNoIframe().should('have.attr', 'name', name);
});
