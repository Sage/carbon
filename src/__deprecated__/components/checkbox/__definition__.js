import Checkbox from '../../../__experimental__/components/checkbox';
import Definition from '../../../../demo/utils/definition';

let definition = new Definition('checkbox', Checkbox, {
  description: `Selects more than one option.`,
  designerNotes: `
* Checkbox provides a way to efficiently select more than one item from a list.
* Disabled or read-only checkboxes might be difficult for a user to distinguish visually, so try to avoid this.
* Consider ‘smart default’ selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
* Rather than a checkbox to accept legal terms, consider labelling a button ‘Accept Terms and Continue’ instead.
  `,
  relatedComponentsNotes: `
* Choosing one option from a longer list? [Try Radio Button](/components/radio-button).
* Choosing one option from a very long list? [Try Dropdown](/components/dropdown).
* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).
 `,
  type: 'form',
  propValues: {
    value: 'test-checkbox'
  },
  propTypes: {
    checked: 'Boolean',
    disabled: 'Boolean',
    error: 'Boolean',
    fieldHelpInline: 'Boolean',
    onChange: 'Function',
    reverse: 'Boolean',
    value: 'String'
  },
  propDescriptions: {
    checked: 'Set the checkbox as checked',
    reverse: 'Flips the input and label render order',
    value: 'Set the value of the checkbox'
  }
});

definition.isAnInput();

export default definition;
