import Switch from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('switch', Switch, {
	description: `Selects more than one option.`,
	designerNotes: `
*	Switches provide a way to efficiently toggle between two states. They are often used on settings pages to switch on and off individual features.
*	Disabled or read-only Switches might be difficult for a user to distinguish visually, so try to avoid this.
*	Consider ‘smart default’ selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
  `,
	relatedComponentsNotes: `
*	Choosing more than one option? [Try Checkbox](/components/checkbox).
*	Choosing one option from a longer list? [Try Radio Button](/components/radio-button).
*	Choosing one option from a very long list? [Try Dropdown](/components/dropdown).
*	Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).
	`,
  type: 'form',
  propValues: {
    value: false
  },
  propTypes: {
    checked: 'Boolean',
    reverse: 'Boolean',
    value: 'Boolean',
    loading: 'Boolean'
  },
  propDescriptions: {
    checked: 'Sets the switch as on.',
    reverse: 'Flips the input and label render order',
    value: 'Set the switch as on.',
		loading: 'When provided will show a spinner in place of the tick or cross while in a loading state.'
  }
});

definition.isAnInput();

export default definition;
