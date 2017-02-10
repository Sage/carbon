import Form from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import PresenceValidation from 'utils/validations/presence';

let definition = new Definition('form', Form, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  hiddenProps: ["validateOnMount", "saveButtonProps", "cancelButtonProps"],
  propOptions: {
    buttonAlign: OptionsHelper.alignBinary
  },
  propTypes: {
    cancel: "Boolean",
    afterFormValidation: "Function",
    beforeFormValidation: "Function",
    buttonAlign: "String",
    saving: "Boolean",
    validateOnMount: "Boolean",
    cancelText: "String",
    cancelButtonProps: "Object",
    saveText: "String",
    saveButtonProps: "Object",
    onCancel: "Function",
    save: "Boolean",
    additionalActions: "Node",
    onSubmit: "Function"
  },
  propDescriptions: {
    cancel: "Set to false to hide the cancel button.",
    afterFormValidation: "A callback triggered after the validation has been ran on the form.",
    beforeFormValidation: "A callback triggered before the validation has been ran on the form.",
    buttonAlign: "Controls which direction the form buttons align.",
    saving: "Can inform if the form is in a saving state (disables the save button).",
    validateOnMount: "Determines if validation should be ran on mount of the component.",
    cancelText: "Supply custom text for the cancel button.",
    cancelButtonProps: "Supply custom props to the cancel button.",
    saveText: "Supply custom text for the save button.",
    saveButtonProps: "Supply custom props for the save button.",
    onCancel: "A callback triggered when the form is cancelled.",
    save: "Set to false to hide the save button.",
    additionalActions: "Supply additional buttons alongside the form's buttons.",
    onSubmit: "A callback triggered when the form is submitted with passing validation."
  },
  propValues: {
    children: `<Textbox
    label="Name"
    validations={[ new PresenceValidation() ]}
  />`
  }
});

export default definition;
