import NumberInput from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('number-input', NumberInput, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'form'
});

definition.isAnInput();

export default definition;
