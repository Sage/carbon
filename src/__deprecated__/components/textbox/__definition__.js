import Textbox from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('textbox', Textbox, {
  description: `Captures a single line of text.`,
  designerNotes: `
* Use placeholder text to give the user examples of data formats (e.g. AB123456C for a UK National Insurance number).
* Use prefixes if your data always begins with a certain sequence (e.g. a UK VAT number usually starts with ‘GB’).
* If content in a textbox is never editable, think about removing the field border so it appears as static text.
* You can disable a textbox, but try to avoid this. If you need to, make it clear what the user needs to do in order to activate the textbox.
* Use wider fields for longer data (e.g. an address line), and narrower fields for shorter data (e.g. a postcode), to give the user a clue about the data expected.
  `,
  relatedComponentsNotes: `
* More than a single line of text? [Try Textarea](/components/textarea).
`,
  type: 'form',
  propValues: {
    value: ''
  }
});

definition.isAnInput();

export default definition;
