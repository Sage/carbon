import SplitButton from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import buttonDefinition from './../button/definition';

let definition = new Definition('split-button', SplitButton, {
  propOptions: {
    as: OptionsHelper.themesBinary,
  },
  propTypes: {
    as: "String",
    text: "String",
    disabled: "Boolean"
  },
  propValues: {
    text: "Example Split Button"
  },
  propDescriptions: {
    as: "Primary or Secondary theme.",
    text: "Text for the main button.",
    disabled: "When enabled will disable the button."
  },
});

definition.addChildByDefinition(buttonDefinition);
definition.addChildByDefinition(buttonDefinition);
definition.addChildByDefinition(buttonDefinition);

export default definition;
