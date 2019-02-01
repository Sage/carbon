import Pill from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('pill', Pill, {
  description: `A visual indicator which helps the user visually scan for something in common.`,
  designerNotes: `
* An eye catching visual indicator used to help a user visually scan and identify items with something in common from a wider list.
* A range of colours and visual styles is available.
* Pills could work particularly well in Tables, for example, to distinguish which invoices are overdue in a long list, or which subscriptions a client has, or to indicate that a feature has ‘beta’ status.
 `,
  type: 'misc',
  propOptions: {
    as: OptionsHelper.colors
  },
  toggleFunctions: ['onDelete'],
  hiddenProps: ['onClick'],
  propTypes: {
    as: "String",
    children: "Node",
    className: 'String',
    fill: "Boolean",
    onClick: 'Function',
    onDelete: 'Function'
  },
  propValues: {
    children: "Pill"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    fill: "Fills the pill background with colour. When fill is false only the border is coloured.",
    onClick: "Callback function for when the pill is clicked",
    onDelete: "Callback function to delete the component, when the added Icon is clicked"
  },
});

export default definition;
