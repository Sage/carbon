import RadioButton from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('radio-button', RadioButton, {
  description: `Selects one option from a longer list.`,
  designerNotes: `
* Consider ‘smart default’ selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
* Useful to show less than about 10 options.
* Disabled or read-only radio buttons might be difficult for a user to distinguish visually, so try to avoid this.

### Related Components
* __Choosing one option from a very long list?__ [Try Dropdown](/components/dropdown).
* __Choosing more than one option?__ [Try Checkbox](/components/checkbox).
* __Choosing one option from a highly visible small range?__ [Try Button Toggle](/components/button-toggle).
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
