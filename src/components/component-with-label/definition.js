import ComponentWithLabel from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('component-with-label', ComponentWithLabel, {
  type: 'misc',
  propValues: {
    label: 'This is my label',
    columnSpan: '10',
    labelAlignment: 'right',
    contentAlignment: 'left',
    children: 'This is where some content would live'
  },
  requiredProps: ['label', 'columnSpan', 'children'],
  propTypes: {
    label: 'String',
    labelAlignment: 'String',
    contentAlignment: 'String',
    columnSpan: 'String',
    children: 'Node',
  },
  propDescriptions: {
    label: 'A label to render',
    labelAlignment: 'Whether the label should be right, center or left aligned',
    contentAlignment: 'Whether the content should be right, center or left aligned',
    columnSpan: 'A columnSpan for the Row wrapper',
    children: 'The child content to render in the component-with-label'
  }
});

export default definition;
