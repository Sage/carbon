import ConfigurableColumnsPattern from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('configurable-columns-pattern', ConfigurableColumnsPattern, {
  dataVariable: 'configurableColumnsData',
  description: `Allow table columns to be configured.`,
  designerNotes: `
* Combines the ConfigurableColumns and ConfigurableColumnRow components.
  `,
  hiddenProps: [],
  propValues: {
    columnsData: `configurableColumnsData`,
    onCancel: `() => {}`,
    onChange: `updateConfigurableColumn`,
    onDrag: `updateConfigurableColumnsData`,
    onReset: `resetConfigurableColumnsData`,
    onSave: `() => {}`,
    title: 'Configure Columns'
  },
  propTypes: {
    className: 'String',
    columnsData: 'Object',
    onCancel: 'Function',
    onChange: 'Function',
    onDrag: 'Function',
    onReset: 'Function',
    onSave: 'Function',
    title: 'String'
  },
  propDescriptions: {
    columnsData: 'Data to define the columns that can be configured',
    className : 'Classes to apply to the component.',
    onCancel: 'Callback triggered when the form is canceled.',
    onDrag: 'Callback triggered when an item is dragged.',
    onReset: 'Callback triggered when the reset button is pressed',
    onSave: 'Callback triggered when the form is saved.',
    title: 'Title to display as heading'
  },
  relatedComponentsNotes: `
* [ConfigurableColumns component](/components/configurable-columns).
* [ConfigurableColumnRow component](/components/configurable-columns/configurable-column-row).
 `,
  requiredProps: ['onCancel', 'onDrag', 'onSave', 'title'],
});

export default definition;
