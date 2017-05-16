'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _optionsHelper = require('utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('pod', _2.default, {
  description: 'A set of content that\u2019s grouped together visually.',
  designerNotes: '\n* Presents content grouped visually together. This can be text, or other components. A good example is a \u2018tile\u2019 showing contact information for an individual.\n* Configure Pod and Fieldset components to work together, or choose the pre-configured Show/Edit Pod component:\n* The [Show/Edit Pod](/components/show-edit-pod) component automatically presents content as a read-only Pod, until the user clicks an edit icon, which shows the same information in an editable Fieldset.\n* But, configuring Pod and Fieldset components manually will give you more customization options, like the following.\n* The On Edit property shows a standard edit icon, which can be used to show a fieldset. You can choose whether this icon appears inside or outside the pod, and whether it appears only on hover. You can also choose whether clicking only the icon triggers the On Edit property, or clicking anywhere on the pod.\n* Choose from various visual options, including padding, borders, and primary, secondary, or tertiary appearance.\n* Set the pod to flex to the width of its content, or take up the full width of its container.\n  ',
  relatedComponentsNotes: '\n* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).\n* Filling in a broad series of inputs? [Try Form](/components/form).\n* Using Fieldset and Pod components together? [Try Show/Edit Pod](/components/pod).\n* Creating a new entity that is usually presented in a pod? [Try Create](/components/create).\n ',
  type: 'form',
  toggleFunctions: ['onEdit'],
  propRequires: {
    collapsed: "title",
    alignTitle: "title",
    editContentFullWidth: "onEdit",
    displayEditButtonOnHover: "onEdit",
    triggerEditOnContent: "onEdit",
    internalEditButton: "onEdit"
  },
  hiddenProps: ['collapsed'],
  propOptions: {
    padding: _optionsHelper2.default.sizesPod,
    as: _optionsHelper2.default.themesFull,
    alignTitle: _optionsHelper2.default.alignFull
  },
  propTypes: {
    border: "Boolean",
    padding: "String",
    as: "String",
    collapsed: "Boolean",
    title: "String",
    subtitle: "String",
    alignTitle: "String",
    description: "String",
    footer: "String",
    onEdit: "Function",
    editContentFullWidth: "Boolean",
    displayEditButtonOnHover: "Boolean",
    triggerEditOnContent: "Boolean",
    internalEditButton: "Boolean"
  },
  propDescriptions: {
    border: "Shows/hides the border of the Pod.",
    padding: "Controls the size of the padding on the Pod.",
    as: "Controls what theme the Pod should use.",
    collapsed: "Enables and controls the collapsed state of the Pod. This needs to be defined on initialise to work.",
    title: "Defines the title for the Pod.",
    subtitle: "Defines the subtitle for the Pod.",
    alignTitle: "Aligns the title within the Pod.",
    description: "Defines a description for the Pod.",
    footer: "Defines footer content for the Pod.",
    onEdit: "A callback triggered when a user clicks the edit action.",
    editContentFullWidth: "Displays the Pod at full width with the edit button.",
    displayEditButtonOnHover: "Only displays the edit button on hover.",
    triggerEditOnContent: "Makes the entire Pod clickable to trigger the onEdit callback.",
    internalEditButton: "Positions the edit button inside the Pod."
  },
  propValues: {
    children: "This is some example content for a Pod."
  }
});

exports.default = definition;