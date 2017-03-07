import NumberInput from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('number-input', NumberInput, {
  description: `I can enter a whole number (not a decimal or currency value).`,
  designerNotes: `
* Where it’s clear a field only accepts numerals, you could disable entry of other characters. But, remember than for some regions, phone numbers and postcodes might contain dashes, and remember to cater for a minus sign if necessary.

* __Entering a number including a decimal point?__ Try Decimal.
* __Entering numbers, symbols, and letters, or handling various formats?__ Try Textbox.
 `,
  type: 'form'
});

definition.isAnInput();

export default definition;
