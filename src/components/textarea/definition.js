import Textarea from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('textarea', Textarea, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'form',
  propRequires: {
    enforceCharacterLimit: 'characterLimit'
  }
});

definition.isAnInput();

export default definition;
