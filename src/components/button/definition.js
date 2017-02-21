import Button from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('button', Button, {
  propOptions: {
    as: OptionsHelper.themesBinary,
    theme: OptionsHelper.buttonColors,
    size: OptionsHelper.sizesRestricted
  },
  propTypes: {
    as: "String",
    children: "Node",
    disabled: "Boolean",
    theme: "String",
    size: "String",
  },
  propValues: {
    children: "Example Button"
  },
  propDescriptions: {
    as: "Choose between Primary or Secondary styling.",
    children: "This component supports children.",
    disabled: "Controls the disabled state of the button.",
    theme: "Choose between different colour themes for the button.",
    size: "Choose between various sizes for the button.",
  },
});

export default definition;
