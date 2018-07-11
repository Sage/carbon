import Column from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('column', Column, {
  type: 'layout',
  propTypes: {
    className: "String",
    columnOffset: "String",
    columnSpan: "String",
    columnAlign: "String",
    columnDivide: "Boolean",
    children: "Node"
  },
  propDescriptions: {
    className: "Classes to apply to the component.",
    columnOffset: "Offset this column by a certain number of columns.",
    columnSpan: "Span this column by a certain number of columns.",
    columnAlign: "Align the content of this column.",
    columnDivide: "Show a divide between columns. This is defined by the row component",
    children: "This component supports children."
  }
});

export default definition;
