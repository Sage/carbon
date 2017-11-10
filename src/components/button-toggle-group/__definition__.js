import ButtonToggleGroup from './';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('button-toggle-group', ButtonToggleGroup, {
  description: 'Adds support for validation, warning and info messages on a group of Button Toggles.',
  designerNotes: `
* Similar to [Button Toggle](/components/button-toggle), but use this component when you need your button toggles to act like a single form component, with field help and validation.
* Unlike [Button Toggle](/components/button-toggle), this component doesn't require one option to be auto-selected.
  `,
  relatedComponentsNotes: `
* Don't need validation on your options? [Try Button Toggle](/components/button-toggle).
  `,
  type: 'form',
  propValues: {
    children: `<ButtonToggle name={ 'grouped' } id={ 'foo' } value={ 'foo' }>
    Foo
  </ButtonToggle>
  <ButtonToggle name={ 'grouped' } id={ 'bar' } value={ 'bar' }>
    Bar
  </ButtonToggle>
  <ButtonToggle name={ 'grouped' } id={ 'baz' } value={ 'baz' }>
    Baz
  </ButtonToggle>`,
    value: ''
  },
  propTypes: {
    children: 'Node',
    className: 'String',
    value: 'String'
  },
  requiredProps: ['children'],
  propDescriptions: {
    value: 'The value associated with the button toggle group.',
    children: 'The children to render for the button toggle group.'
  },
  hiddenProps: ['children', 'value']
});

definition.isAnInput();

export default definition;
