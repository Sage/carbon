import Preview from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('preview', Preview, {
  description: `Applies a preview loading state animation`,
  designerNotes: `
  * 
  `,
  type: 'miscellaneous',
  propValues: {
    children: "",
    loading: undefined,
  },
  propTypes: {
    children: 'Node',
    loading: 'Boolean',
  },
  propDescriptions: {
    children: 'Child content to render in the component.',
    className: 'Classes to be applied to the component.'
  }
});

definition.isAnInput();

export default definition;