import { ConfigurableItems } from './';
import Definition from './../../../demo/utils/definition';
import configurableItemRowDefinition from './configurable-item-row/definition';

let definition = new Definition('configurable-items', ConfigurableItems, {
  associatedDefinition: [configurableItemRowDefinition],
  dataVariable: 'configurableItemsData',
  description: `Allow a list of items to be checked/unchecked and re-ordered.`,
  designerNotes: `
* Designed to be used in tandem with the onConfigure prop in the table component so that columns can be enabled/disabled and re-ordered.
  `,
  hiddenProps: ['children'],
  js: `
    function rows(data) {
      return (
        data.map((column, rowIndex) => {
          return (
            <ConfigurableItemRow
              enabled={column.get('enabled')}
              key={rowIndex}
              locked={column.get('locked')}
              name={column.get('name')}
              rowIndex={rowIndex}
              onChange={onChange(rowIndex)}
            />
          );
        })
      );
    }

    function onChange(rowIndex) {
      return (event) => {
        updateConfigurableItem(rowIndex)
      }
    }
  `,
  propValues: {
    children: `{ rows(configurableItemsData) }`,
    onCancel: `() => {}`,
    onDrag: `updateConfigurableItemsData`,
    onReset: `resetConfigurableItemsData`,
    onSave: `() => {}`
  },
  propTypes: {
    children: 'Node',
    className: 'String',
    onCancel: 'Function',
    onDrag: 'Function',
    onReset: 'Function',
    onSave: 'Function',
  },
  propDescriptions: {
    children: 'This component supports children',
    className : 'Classes to apply to the component.',
    onCancel: 'Callback triggered when the form is canceled.',
    onDrag: 'Callback triggered when an item is dragged.',
    onReset: 'Callback triggered when the reset button is pressed',
    onSave: 'Callback triggered when the form is saved.'
  },
  relatedComponentsNotes: `
* [Table component](/components/table)
* [ConfigurableItemsPattern](/patterns/configurable-items-pattern)
 `,
  requiredProps: ['onCancel', 'onDrag', 'onSave', 'title'],
});

export default definition;
