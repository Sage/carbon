import Preview from './';

let definition = new Definition('preview', Preview, {
  description: `creates a placeholder div when no children are given, or if the loading prop is set to true`,
  designerNotes: `
* Use placeholder text to give the user context or examples of what to write.
  `,
  type: 'miscellaneous',
  propValues: {
    children: "I'm a some text that can display some information.",
  },
  propTypes: {
    children: 'Node',
    className: 'String',
  },
  propDescriptions: {
    children: 'Child content to render in the component.',
    className: 'Classes to be applied to the component.'
  }
});

definition.isAnInput();

export default definition;