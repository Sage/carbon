import MultiActionButton from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';
import buttonDefinition from './../button/definition';

let definition = new Definition('multi-action-button', MultiActionButton, {
  propOptions: {
    as: OptionsHelper.themesBinary,
    align: OptionsHelper.alignBinary
  },
  propTypes: {
    as: "String",
    text: "String",
    disabled: "Boolean",
    align: "String"
  },
  propValues: {
    text: "Example Multi Action Button",
  },
  propDescriptions: {
    as: "Primary or Secondary theme.",
    text: "Text for the main button.",
    disabled: "When enabled will disable the button.",
    align: "Aligns the buttons actions either to the left or right."
  },
});

definition.addChildByDefinition(buttonDefinition);
definition.addChildByDefinition(buttonDefinition);
definition.addChildByDefinition(buttonDefinition);

export default definition;
