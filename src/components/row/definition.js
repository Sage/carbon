import Row from './';
import OptionsHelper from 'utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let columnDefinition = new Definition('child', {}, {
  props: ['columnOffset', 'columnSpan', 'columnAlign', 'columnClasses'],
  propTypes: {
    columnOffset: "String",
    columnSpan: "String",
    columnAlign: "String",
    columnClasses: "String",
    children: "Node"
  },
  propDescriptions: {
    columnOffset: "Offset this column by a certain number of columns.",
    columnSpan: "Span this column by a certain number of columns.",
    columnAlign: "Align the content of this column.",
    columnClasses: "Apply custom classes to this column.",
    children: "This component supports children."
  }
});

let definition = new Definition('row', Row, {
  associatedDefinitions: [columnDefinition],
  js: `function style() {
  return { backgroundColor: '#50B848', height: '10px' };
}`,
  hiddenProps: ['children'],
  propValues: {
    children: `<div style={ style() } />
  <div style={ style() } />
  <div style={ style() } />
  <div style={ style() } />
  <div style={ style() } />
  <div style={ style() } />`
  },
  propTypes: {
    gutter: "String",
    columnDivide: "Boolean",
    columns: "String"
  },
  propDescriptions: {
    gutter: "Define how wide the gutter between the rows and columns should be.",
    columnDivide: "Enable a divider between each column.",
    columns: "Define a certain amount of columns, instead of basing it on the number of children."
  },
  propOptions: {
    gutter: OptionsHelper.sizesFull
  }
});

export default definition;
