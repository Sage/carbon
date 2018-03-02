import Preview from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('preview', Preview, {
  description: `Applies a preview loading state animation`,
  type: 'miscellaneous',
  propValues: {
    children: "",
    loading: undefined,
  },
  propTypes: {
    children: 'Node',
    className: 'String',
    loading: 'Boolean'
  },
  propDescriptions: {
    children: 'Child content to render in the component.',
    className: 'Classes to be applied to the component.',
    loading: 'Provides more control over when in a loading state.'
  }
});

export default definition;
