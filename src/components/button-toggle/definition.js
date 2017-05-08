import ButtonToggle from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('button-toggle', ButtonToggle, {
  description: `Selects one option from a small number of highly visible options.`,
  designerNotes: `
* Useful if the user has a choice between a small number of options, that you’d like to be highly visible (e.g. choosing between three or fewer subscription packages, with short names).
* To make the meaning of an option clearer, you can add an icon to it. Just name one of the Carbon icons.
  `,
  relatedComponentsNotes: `
* Performing a single action? [Try Button](/components/button).
* Range of buttons where one is more important? [Try Split Button](/components/split-button).
* Range of buttons of the same importance? [Try Multi Action Button](/components/multi-action-button).
* Choosing one option from a longer list? [Try Radio Button](/components/radio-button).
* Choosing one option from a very long list? [Try Dropdown](/components/dropdown).
* Choosing more than one option? [Try Checkbox](/components/checkbox).
* Need a visual? [Try Icons](/style/icons).
 `,
  type: 'action',
  numberOfExamples: 3,
  propOptions: {
    buttonIcon: OptionsHelper.icons,
    buttonIconSize: OptionsHelper.sizesBinary
  },
  propValues: {
    name: "option",
    children: "Option",
    value: "option-1"
  },
  propTypes: {
    buttonIcon: "String",
    buttonIconSize: "String",
    name: "String",
    value: "String",
    children: "Node"
  },
  requiredProps: ['children'],
  propRequires: {
    buttonIconSize: "buttonIcon"
  },
  propDescriptions: {
    buttonIcon: "Define an icon to use for the button",
    buttonIconSize: "Define what size the icon should be. Possible values include: " + OptionsHelper.sizesBinary.join(", "),
    name: "The label that will be used for the selected button. Use the same name across multiple buttons for them to operate as radio buttons.",
    value: "The value associated with the selected button.",
    children: "The children to render for the button."
  },
  hiddenProps: ["name", "value"]
});

export default definition;
