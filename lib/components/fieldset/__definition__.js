'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _optionsHelper = require('../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition__ = require('./../textbox/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('fieldset', _2.default, {
  description: 'Edits a set of closely related inputs that are grouped together.',
  designerNotes: '\n* You can nest any Carbon input into this component.\n* Useful for presenting a series of inputs that are closely related, within a wider Form or Pod (e.g. an address or contact details).\n* Configure Pod and Fieldset components to work together, or choose the pre-configured Show/Edit Pod component.\n* The [Show/Edit Pod](/components/show-edit-pod) component automatically presents content as a read-only Pod, until the user clicks an edit icon, which shows the same information in an editable Fieldset.\n* But, configuring Pod and Fieldset components manually will give you more customization options, like the following.\n* Top-aligned labels (Carbon default) or inline right-aligned labels are usually fastest for users.\n* Create a single path to completion with your inputs, and between your inputs and the primary action Button.\n* Indicate mandatory, or optional fields, whichever is the minority. Think carefully before collecting optional data - don\u2019t collect information you don\u2019t need! Try suffixing \u2018(optional)\u2019 after your field label.\n* More guidance is available for each of the individual inputs you might place inside this component.\n  ',
  relatedComponentsNotes: '\n* Filling in a broad series of inputs? [Try Form](/components/form).\n* Viewing content that\u2019s grouped together visually? [Try Pod](/components/pod).\n* Using Fieldset and Pod components together? [Try Show/Edit Pod](/components/show-edit-pod).\n* Creating a new entity that is usually presented in a pod? [Try Create](/components/create).\n ',
  propTypes: {
    legend: "String"
  },
  propDescriptions: {
    legend: "Adds a legend to the fieldset."
  }
});

definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "First Name",
  labelAlign: "right"
});
definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Last Name",
  labelAlign: "right"
});
definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Address",
  labelAlign: "right"
});
definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "City",
  labelAlign: "right"
});
definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Country",
  labelAlign: "right"
});
definition.addChildByDefinition(_definition__2.default, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Telephone",
  labelAlign: "right"
});

exports.default = definition;