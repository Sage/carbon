import Textbox from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('textbox', Textbox, {
  type: 'form'
});

definition.isAnInput();

export default definition;
