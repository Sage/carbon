import Row from './';
import OptionsHelper from 'utils/helpers/options-helper';
import ColumnDefinition from './column/definition';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('row', Row, {
  description: `Sets up a basic column-based UI layout.`,
  associatedDefinitions: [ColumnDefinition],
  designerNotes: `
* Useful to organise the UI of a page into a simple column-based layout.
* Configure the number of columns, the margin between them, and any separators.
  `,
  relatedComponentsNotes: `
* Need an overall container? [Try App Wrapper](/components/app-wrapper).
* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).
* Need a layout with controls and guidance text? [Try Settings Row](/components/settings-row).
 `,
  hiddenProps: ['children'],
  propTypes: {
    gutter: "String",
    columnDivide: "Boolean",
    columns: "String"
  },
  propDescriptions: {
    gutter: "Define how wide the gutter between the rows and columns should be.",
    columnDivide: "Enable a divider between each column.",
    columns: "Define a certain amount of columns, instead of basing it on the number of children.",
    children: "This component supports children of type Column."
  },
  propOptions: {
    gutter: OptionsHelper.sizesFull
  }
});

definition.addChildByDefinition(ColumnDefinition, { children: `<div />` });
definition.addChildByDefinition(ColumnDefinition, { children: `<div />` });
definition.addChildByDefinition(ColumnDefinition, { children: `<div />` });
definition.addChildByDefinition(ColumnDefinition, { children: `<div />` });
definition.addChildByDefinition(ColumnDefinition, { children: `<div />` });
definition.addChildByDefinition(ColumnDefinition, { children: `<div />` });

export default definition;
