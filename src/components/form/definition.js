import Form from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import PresenceValidation from 'utils/validations/presence';

let definition = new Definition('form', Form, {
  description: `A series of inputs to capture data.`,
  designerNotes: `
* You can nest any Carbon input into this component.
* Carbon gives you standard Save and Cancel buttons with this component.
* A great source of knowledge for creating excellent web forms comes from Luke Wroblewski.
* Top-aligned labels (Carbon default) or inline right-aligned labels are usually fastest for users.
* Try to create a single path to completion with your inputs, and between your inputs and the primary action Button - there’s good evidence users complete forms faster like this.
* If an input is read-only, remove the field border so it appears as static text.
* You can disable components in forms, but try to avoid this. If you need to, make it clear what the user needs to do, in order to activate the component.
* Indicate mandatory, or optional fields, whichever is the minority. Think carefully before collecting optional data - don’t collect information you don’t need! Try suffixing ‘(optional)’ after your field label.
* More guidance is available for each of the individual inputs you might place inside this component.
  `,
  relatedComponentsNotes: `
* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).
 `,
  hiddenProps: ["validateOnMount", "saveButtonProps", "cancelButtonProps", "customSaveButton", "children"],
  propOptions: {
    buttonAlign: OptionsHelper.alignBinary
  },
  propTypes: {
    cancel: "Boolean",
    children: "Node",
    className: "String",
    afterFormValidation: "Function",
    beforeFormValidation: "Function",
    buttonAlign: "String",
    saving: "Boolean",
    validateOnMount: "Boolean",
    cancelText: "String",
    cancelButtonProps: "Object",
    customSaveButton: "Object",
    saveText: "String",
    saveButtonProps: "Object",
    onCancel: "Function",
    save: "Boolean",
    additionalActions: "Node",
    onSubmit: "Function",
    iterative: "Boolean",
  },
  propDescriptions: {
    cancel: "Set to false to hide the cancel button.",
    children: "This component supports children.",
    afterFormValidation: "A callback triggered after the validation has been ran on the form.",
    beforeFormValidation: "A callback triggered before the validation has been ran on the form.",
    buttonAlign: "Controls which direction the form buttons align.",
    saving: "Can inform if the form is in a saving state (disables the save button).",
    validateOnMount: "Determines if validation should be ran on mount of the component.",
    cancelText: "Supply custom text for the cancel button.",
    cancelButtonProps: "Supply custom props to the cancel button.",
    customSaveButton: "Supply a custom Save button which overrides the standard button",
    saveText: "Supply custom text for the save button.",
    saveButtonProps: "Supply custom props for the save button.",
    onCancel: "A callback triggered when the form is cancelled.",
    save: "Set to false to hide the save button.",
    additionalActions: "Supply additional buttons alongside the form's buttons.",
    onSubmit: "A callback triggered when the form is submitted with passing validation.",
    iterative: "A flag for when the user should be able to repeatedly save & re-use a form."
  },
  propValues: {
    activeInput: '',
    cancelText: '',
    children: `<Textbox
    label="Name"
    validations={[ new PresenceValidation() ]}
  />`,
    saveText: ''
  }
});

export default definition;
