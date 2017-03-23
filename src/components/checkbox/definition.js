import Checkbox from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('checkbox', Checkbox, {
	description: `Selects more than one option.`,
	designerNotes: `
* Checkbox provides a way to efficiently select more than one item from a list.
* Disabled or read-only checkboxes might be difficult for a user to distinguish visually, so try to avoid this.
* Consider ‘smart default’ selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
* Rather than a checkbox to accept legal terms, consider labelling a button ‘Accept Terms and Continue’ instead.

### Related Components
* __Choosing one option from a longer list?__ [Try Radio Button](/components/radio-button).
* __Choosing one option from a very long list?__ [Try Dropdown](/components/dropdown).
* __Choosing one option from a highly visible range?__ [Try Button Toggle](/components/button-toggle).
 `,
  type: 'form',
  propTypes: {
    reverse: 'Boolean'
  },
  propDescriptions: {
    reverse: 'Flips the input and label render order'
  }
});

definition.isAnInput();

export default definition;
