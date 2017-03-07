import RadioButton from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('radio-button', RadioButton, {
  description: `I can choose one option from a longer list.`,
  designerNotes: `
* Consider ‘smart default’ selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
* Disabled or read-only radio buttons might be difficult for a user to distinguish visually, so try to avoid this.

* __Choosing one option from a very long list?__ Try Dropdown.
* __Choosing more than one option?__ Try Checkbox.
* __Choosing one option from a highly visible small range?__ Try Button Toggle.
 `,
  type: 'form',
  numberOfExamples: 2,
  propTypes: {
    reverse: 'Boolean'
  },
  propValues: {
    name: "example"
  },
  propDescriptions: {
    reverse: 'Flips the input and label render order'
  }
});

definition.isAnInput();

export default definition;
