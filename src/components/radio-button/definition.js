import RadioButton from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('radio-button', RadioButton, {
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
