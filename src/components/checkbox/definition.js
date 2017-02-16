import Checkbox from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('checkbox', Checkbox, {
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
