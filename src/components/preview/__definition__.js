import Preview from './';

let definition = new Definition('preview', Preview, {
  description: `allows extra functionality over a basic div.`,
  designerNotes: `
* Use placeholder text to give the user context or examples of what to write.
  `,
  type: 'miscellaneous',
  hiddenProps: [
    'id'
  ],
  propValues: {
    children: "I'm a some text that can display some information.",
    isVisible: true
  },
  propTypes: {
    children: 'Node',
    className: 'String',
    id: 'String',
    isVisible: 'Boolean'
  },
  propDescriptions: {
    children: 'Child content to render in the text.',
    className: 'Classes to be applied to the component.',
    id: 'The id attribute to apply to the Preview',
    isVisible: 'Whether to show or hide the Preview and children. Use this with a handler to hide and show the Preview and children'
  }
});

definition.isAnInput();

export default definition;