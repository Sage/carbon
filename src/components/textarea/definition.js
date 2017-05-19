import Textarea from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('textarea', Textarea, {
  description: `Captures more than one line of text.`,
  designerNotes: `
* Useful for collecting a significant amount of text (e.g. notes about clients, or a short email message).
* Only handles plain text at this time - not markup or markdown, but it does handle line breaks.
* If content in a textarea is read-only, remove the field border so it appears as static text.
* Use placeholder text to give the user context or examples of what to write.
  `,
  relatedComponentsNotes: `
* Just a single line of text? [Try Textbox](/components/textbox).
`,
  type: 'form',
  propRequires: {
    enforceCharacterLimit: 'characterLimit'
  },
  propDescriptions: {
    characterLimit: "Displays a character count to inform the user how many characters they have used from a recommended amount.",
    enforceCharacterLimit: "Enforces the maximum number of characters.",
    expandable: "Makes the textarea automatically expand depending on the amount of text the user inputs.",
    warnOverLimit: "When the character limit is exceeded the chracter count text will turn red."
  },
  propTypes: {
    characterLimit: "String",
    enforceCharacterLimit: "Boolean",
    expandable: "Boolean",
    warnOverLimit: "Boolean"
  }
});

definition.isAnInput();

export default definition;
