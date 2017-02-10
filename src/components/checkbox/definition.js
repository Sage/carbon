import Checkbox from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('checkbox', Checkbox, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
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
