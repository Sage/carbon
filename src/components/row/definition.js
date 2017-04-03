import Row from './';
import OptionsHelper from 'utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let columnDefinition = new Definition('child', {}, {
  description: `Sets up a basic column-based UI layout.`,
  designerNotes: `
* Useful to organise the UI of a page into a simple column-based layout.
* Configure the number of columns, the margin between them, and any separators.
  `,
  relatedComponentsNotes: `
* Need an overall container? [Try App Wrapper](/components/app-wrapper).
* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).
* Need a layout with controls and guidance text? [Try Settings Row](/components/settings-row).
 `,
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
  hiddenProps: ['children'],
  propValues: {
    children: `<div/>
  <div/>
  <div/>
  <div/>
  <div/>
  <div/>`
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
