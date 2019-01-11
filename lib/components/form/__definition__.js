'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _presence = require('utils/validations/presence');

var _presence2 = _interopRequireDefault(_presence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('form', _2.default, {
  description: 'A series of inputs to capture data.',
  designerNotes: '\n* You can nest any Carbon input into this component.\n* Carbon gives you standard Save and Cancel buttons with this component.\n* A great source of knowledge for creating excellent web forms comes from Luke Wroblewski.\n* Top-aligned labels (Carbon default) or inline right-aligned labels are usually fastest for users.\n* Try to create a single path to completion with your inputs, and between your inputs and the primary action Button - there\u2019s good evidence users complete forms faster like this.\n* If an input is read-only, remove the field border so it appears as static text.\n* You can disable components in forms, but try to avoid this. If you need to, make it clear what the user needs to do, in order to activate the component.\n* Indicate mandatory, or optional fields, whichever is the minority. Think carefully before collecting optional data - don\u2019t collect information you don\u2019t need! Try suffixing \u2018(optional)\u2019 after your field label.\n* More guidance is available for each of the individual inputs you might place inside this component.\n  ',
  relatedComponentsNotes: '\n* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).\n ',
  hiddenProps: ["validateOnMount", "saveButtonProps", "cancelButtonProps", "customSaveButton", "children"],
  propOptions: {
    buttonAlign: _optionsHelper2.default.alignBinary
  },
  propTypes: {
    autoDisable: "Boolean",
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
    stickyFooter: "Boolean",
    onSubmit: "Function",
    iterative: "Boolean",
    summary: "Boolean",
    unsavedWarning: "Boolean"
  },
  propDescriptions: {
    autoDisable: "Set to true to disable the save button once the form has been submitted",
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
    stickyFooter: "Enables the form buttons to become sticky when off the screen.",
    additionalActions: "Supply additional buttons alongside the form's buttons.",
    onSubmit: "A callback triggered when the form is submitted with passing validation.",
    iterative: "A flag for when the user should be able to repeatedly save & re-use a form.",
    summary: "Set to false to hide the summary",
    unsavedWarning: "Warning popup shown when trying to navigate away from an edited form if true"
  },
  propValues: {
    cancelText: '',
    children: '<Textbox\n    label="Name"\n    validations={[ new PresenceValidation() ]}\n    />',
    saveText: ''
  }
});

exports.default = definition;