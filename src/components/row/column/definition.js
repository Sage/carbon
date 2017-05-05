import Column from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('column', Column, {
  type: 'layout',
  propTypes: {
    columnOffset: "String",
    columnSpan: "String",
    columnAlign: "String",
    children: "Node"
  },
  propDescriptions: {
    columnOffset: "Offset this column by a certain number of columns.",
    columnSpan: "Span this column by a certain number of columns.",
    columnAlign: "Align the content of this column.",
    children: "This component supports children."
  }
});

export default definition;
