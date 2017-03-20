import NumberInput from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('number-input', NumberInput, {
  type: 'form'
});

definition.isAnInput();

export default definition;
