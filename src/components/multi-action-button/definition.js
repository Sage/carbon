import MultiActionButton from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import buttonDefinition from './../button/definition';

let definition = new Definition('multi-action-button', MultiActionButton, {
  description: `I can choose from several buttons without needing to see them all the time - all options are of equal importance, and related to each other.`,
  designerNotes: `
* Offers related actions to the user, but without taking up valuable space by showing them separately.
* But, users may not always discover them, and could miss out.
* Only use this component for commands that are related (e.g. Export PDF, Export CSV).
* Don’t use this component if one option is more generic or important than the others.
* Carbon has a Transparent configuration, with subtle visual style, which could be useful to present less important or infrequently used options to the user, without calling attention to them.

* __Performing a single action?__ Try Button.
* __Range of buttons where one is more important?__ Try Split Button.
* __Choosing one option from a highly visible range?__ Try Button Toggle.
 `,
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
