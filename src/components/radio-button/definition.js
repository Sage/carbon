import RadioButton from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('radio-button', RadioButton, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
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
