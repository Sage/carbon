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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('create', _2.default, {
  description: 'Creates a new set of content that\'s grouped together.',
  designerNotes: '\n* Creates an item of data usually presented in a Pod or Fieldset, for example, an address.\n  ',
  relatedComponentsNotes: '\n* Editing a number of closely related inputs? [Try Fieldset](/components/fieldset).\n* Filling in a broad series of inputs? [Try Form](/components/form).\n* Viewing content that\u2019s grouped together visually? [Try Pod](/components/pod).\n* Using Fieldset and Pod components together? [Try Show/Edit Pod](/components/show-edit-pod).\n ',
  hiddenProps: ["linkProps"],
  propValues: {
    children: "Resource Name"
  },
  propTypes: {
    children: "Node",
    className: "String",
    linkProps: "Object"
  },
  propDescriptions: {
    children: "This component supports children",
    className: "Classes to apply to the component",
    linkProps: "An object of props to pass down to the link. See Link component for more details"
  }
});

exports.default = definition;