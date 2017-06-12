import { ConfigurableColumns } from './';
import Definition from './../../../demo/utils/definition';
import configurableColumnRowDefinition from './configurable-column-row/definition';

let definition = new Definition('configurable-columns', ConfigurableColumns, {
  associatedDefinition: [configurableColumnRowDefinition],
  dataVariable: 'configurableColumnsData',
  description: `Allow table columns to be configured.`,
  designerNotes: `
* Designed to be used in tandem with the onConfigure prop in the table component.
  `,
  hiddenProps: ['children'],
  js: `
    function rows(data) {
      return (
        <ol className='carbon-configurable-columns__columns-wrapper'>
          {
            data.map((column, rowIndex) => {
              return (
                <ConfigurableColumnRow
                  enabled={column.get('enabled')}
                  key={rowIndex}
                  locked={column.get('locked')}
                  name={column.get('name')}
                  rowIndex={rowIndex}
                  onChange={onChange(rowIndex)}
                />
              );
            })
          }
        </ol>
      );
    }

    function onChange(rowIndex) {
      return (event) => {
        updateConfigurableColumn(rowIndex)
      }
    }
  `,
  propValues: {
    children: `{ rows(configurableColumnsData) }`,
    onCancel: `() => {}`,
    onDrag: `updateConfigurableColumnsData`,
    onReset: `resetConfigurableColumnsData`,
    onSave: `() => {}`,
    title: 'Configure Columns'
  },
  propTypes: {
    children: 'Node',
    className: 'String',
    onCancel: 'Function',
    onDrag: 'Function',
    onReset: 'Function',
    onSave: 'Function',
    title: 'String'
  },
  propDescriptions: {
    children: 'This component supports children',
    className : 'Classes to apply to the component.',
    onCancel: 'Callback triggered when the form is canceled.',
    onDrag: 'Callback triggered when an item is dragged.',
    onReset: 'Callback triggered when the reset button is pressed',
    onSave: 'Callback triggered when the form is saved.',
    title: 'Title to display as heading'
  },
  relatedComponentsNotes: `
* [Table component](/components/table)
* [ConfigurableColumnsPattern](/patterns/configurable-columns-pattern)
 `,
  requiredProps: ['onCancel', 'onDrag', 'onSave', 'title'],
});

export default definition;
