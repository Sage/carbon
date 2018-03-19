import Preview from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('preview', Preview, {
  description: `Applies a preview loading state animation`,
  type: 'miscellaneous',
  propTypes: {
    children: 'Node',
    className: 'String',
    height: 'String',
    lines: 'Number',
    loading: 'Boolean',
    width: 'String'
  },
  propDescriptions: {
    children: 'Child content to render in the component.',
    className: 'Classes to be applied to the component.',
    height: 'A custom height',
    lines: 'The number of lines to render',
    loading: 'Provides more control over when in a loading state.',
    width: 'A custom width'
  }
});

export default definition;
