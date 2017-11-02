import ButtonToggleGroup from './';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('button-toggle-group', ButtonToggleGroup, {
  description: 'Adds support for validation, warning and info messages on a group of Button Toggles.',
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
