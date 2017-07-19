import ConfigurableItemsPattern from './';
import ConfigurableItemsActions from './actions';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('configurable-items-pattern', ConfigurableItemsPattern, {
  dataVariable: 'configurableItemsData',
  description: `A dialog that allows a list of items to be checked/unchecked and re-ordered.`,
  designerNotes: `
* Combines the ConfigurableItems and ConfigurableItemRow components.
  `,
  hiddenProps: ['itemsData'],
  propValues: {
    itemsData: `configurableItemsData`,
    onSave: `() => {}`,
    title: 'Configure Items'
  },
  propTypes: {
    className: 'String',
    itemsData: 'Object',
    onCancel: 'Function',
    onSave: 'Function',
    title: 'String'
  },
  propDescriptions: {
    itemsData: 'Data to define the items that can be configured',
    className : 'Classes to apply to the component.',
    onCancel: 'Callback triggered when the form is cancelled.',
    onSave: 'Callback triggered when the form is saved.',
    title: 'Title to display as heading'
  },
  relatedComponentsNotes: `
* [ConfigurableItems component](/components/configurable-items).
* [ConfigurableItemRow component](/components/configurable-items/configurable-item-row).
 `,
  requiredProps: ['onSave', 'title'],
});

definition.openPreview = true;
definition.onOpenPreview = function onOpenPreview() {
  ConfigurableItemsActions.toggleDialogOpen()
};

export default definition;
