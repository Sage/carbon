import NumberInput from './';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('number-input', NumberInput, {
  description: 'Captures a whole number (not a decimal or currency value).',
  designerNotes: `
* Where it’s clear a field only accepts numerals, you could disable entry of other characters. But, remember than for some regions, phone numbers and postcodes might contain dashes, and remember to cater for a minus sign if necessary.
  `,
  relatedComponentsNotes: `
* Entering a number including a decimal point? [Try Decimal](/components/decimal).
* Entering numbers, symbols, and letters, or handling various formats? [Try Textbox](/components/textbox).
 `,
  hiddenProps: [
    'onKeyDown',
    'value'
  ],
  propDescriptions: {
    className: 'Classes to apply to the component.',
    onKeyDown: 'Callback function called in response to the keydown event',
    value: 'Controls the value of the NumberInput component'
  },
  propTypes: {
    className: 'String',
    onKeyDown: 'Function',
    value: 'String'
  },
  type: 'form',
  propValues: {
    value: ''
  }
});

definition.isAnInput();

export default definition;
