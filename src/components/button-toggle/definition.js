import ButtonToggle from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('button-toggle', ButtonToggle, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
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
