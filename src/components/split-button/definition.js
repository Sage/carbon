import SplitButton from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import buttonDefinition from './../button/definition';

let definition = new Definition('split-button', SplitButton, {
  description: `Related buttons that are shown on hover where one option is more important than the others.`,
  designerNotes: `
* Offers one more important action to the user, with some related actions also quickly accessible, but without taking up valuable space by showing them all separately.
* But, users may not always discover the related items, and could miss out.
* Useful to show about 5 options or less.
* Only use this component for buttons that are very closely related (e.g. Save, Save and Email, Save and Print, Save and New).
* Only use this component if one option is more generic or important than the others.
  `,
  relatedComponentsNotes: `
* Taking a single positive or negative action? [Try Button](/components/button).
* Range of buttons all of the same importance? [Try Multi Action Button](/components/multi-action-button).
* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).
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
