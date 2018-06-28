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

var _definition__ = require('./../form/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('show-edit-pod', _2.default, {
  description: 'Presents and edits a set of content that\u2019s grouped together visually (in one pre-configured component).',
  designerNotes: '\n* Nest any Carbon input into this component.\n* Configure Pod and Fieldset components to work together, or choose this pre-configured Show/Edit Pod component:\n* The Show/Edit Pod Component automatically presents content as a read-only Pod, until the user clicks an edit icon, which shows the same information in an editable Fieldset.\n* But, configuring Pod and Fieldset components manually will give you more customization options.\n* Choose whether the editable state has a disabled or enabled Save button, a Cancel button, or a Delete button, and their alignment.\n* Choose from various visual options, including borders, and primary, secondary, or tertiary appearance.\n* Set the pod to flex to the width of its content, or take up the full width of its container.\n* Top-aligned labels (Carbon default) or inline right-aligned labels are usually fastest for users.\n* Create a single path to completion with your inputs, and between your inputs and the primary action Button.\n* Indicate mandatory, or optional fields, whichever is the minority. Think carefully before collecting optional data - don\u2019t collect information you don\u2019t need! Try suffixing \u2018(optional)\u2019 after your field label.\n* More guidance is available for each of the individual inputs you might place inside this component.\n  ',
  relatedComponentsNotes: '\n* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).\n* Filling in a broad series of inputs? [Try Form](/components/form).\n* Viewing content that\u2019s grouped together visually? [Try Pod](/components/pod).\n* Creating a new entity that is usually presented in a pod? [Try Create](/components/create).\n ',
  hiddenProps: ['children', 'editing', 'validateOnMount', 'transitionName'],
  toggleFunctions: ['onDelete'],
  propOptions: (0, _lodash.assign)({}, _definition__2.default.propOptions, {
    as: _optionsHelper2.default.themesFull
  }),
  defaultProps: (0, _lodash.assign)({}, _definition__2.default.defaultProps, _2.default.defaultProps),
  propTypes: (0, _lodash.assign)({}, _definition__2.default.propTypes, {
    children: "Node",
    className: "String",
    editing: "Boolean",
    onEdit: "Function",
    onDelete: "Function",
    editFields: "Node",
    title: "String",
    transitionName: "String",
    border: "Boolean",
    as: "String",
    deleteText: "String"
  }),
  propValues: {
    children: '<Content title="First Name">Alan</Content>\n  <Content title="Last Name">Smith</Content>\n  <Content title="Telephone">000 000 0000</Content>',
    title: "Person",
    editFields: '[\n    <Textbox key=\'first_name\' label="First Name" value="Alan" />,\n    <Textbox key=\'second_name\' label="Second Name" value="Smith" />,\n    <Textbox key=\'telephone\' label="Telephone" value="000 000 0000" />\n  ]'
  },
  propDescriptions: (0, _lodash.assign)({}, _definition__2.default.propDescriptions, {
    as: "Set a theme for the Pod.",
    border: "Enabled/disable the border on the Pod.",
    children: "This component supports children.",
    className: "Classes to apply to the component.",
    deleteText: "Define custom text for the delete button.",
    editFields: "Define fields to be rendered in the edit state.",
    editing: "Allows developers to control the editing state manually.",
    onDelete: "Callback triggered when the delete action is clicked.",
    onEdit: "Callback triggered when the edit action is clicked.",
    title: "Define a title for the Pod.",
    transitionName: "Define a custom transition between show and edit states."
  })
});

exports.default = definition;