import SplitButton from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import buttonDefinition from './../button/definition';

let definition = new Definition('split-button', SplitButton, {
  description: `Several buttons that don't need to be seen all the time - buttons are of equal importance, and related to each other. - one option is more important than the others, but they’re all related.`,
  designerNotes: `
* Offers one more important action to the user, with some related actions also quickly accessible, but without taking up valuable space by showing them all separately.
* But, users may not always discover the related items, and could miss out.
* Useful to show about 5 options or less.
* Only use this component for buttons that are very closely related (e.g. Save, Save and Email, Save and Print, Save and New).
* Only use this component if one option is more generic or important than the others.

### Related Components
* __Taking a single positive or negative action?__ [Try Button](/components/button).
* __Range of buttons all of the same importance?__ [Try Multi Action Button](/components/multi-action-button).
* __Choosing one option from a highly visible range?__ [Try Button Toggle](/components/button-toggle).
`,
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
