import pill-toggle from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('pill-toggle', pill-toggle, {
  designerNotes: `
* Useful if the user has a choice between a small number of options, and makes it consistently clear which option is
* active (e.g. choosing between two to three languages on a page).
* To make t he meaning of an option clearer, you can add an icon to it. Just name one of the Carbon icons.
  `,
  relatedComponentsNotes: `
* Offering a small number of options with a toggle interface? [Try Button Toggle](/components/button-toggle)
* Performing a single action? [Try Button](/components/button).
* Range of buttons where one is more important? [Try Split Button](/components/split-button).
* Range of buttons of the same importance? [Try Multi Action Button](/components/multi-action-button).
* Choosing one option from a longer list? [Try Radio Button](/components/radio-button).
* Choosing more than one option? [Try Checkbox](/components/checkbox).
* Need a visual? [Try Icons](/style/icons).`,
  type: 'misc',
  propOptions: {
    as: OptionsHelper.colors
  },
  hiddenProps: ['onClick'],
  propTypes: {
    as: "String",
    children: "Node",
    className: 'String',
    fill: "Boolean",
    onClick: 'Function'
  },
  propValues: {
    children: "pill-toggle"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    fill: "Fills the pill-toggle background with colour. When fill is false only the border is coloured.",
    onClick: "Callback function for when the pill-toggle is clicked"
  },
});

export default definition;
