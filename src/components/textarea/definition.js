import Textarea from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('textarea', Textarea, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'form',
  propRequires: {
    enforceCharacterLimit: 'characterLimit'
  },
  propDescriptions: {
    characterLimit: "Displays a character count to inform the user how many characters they have used from a recommended amount.",
    enforceCharacterLimit: "Enforces the maximum number of characters.",
    expandable: "Makes the textarea automatically expand depending on the amount of text the user inputs."
  },
  propTypes: {
    characterLimit: "Number",
    enforceCharacterLimit: "Boolean",
    expandable: "Boolean"
  }
});

definition.isAnInput();

export default definition;
