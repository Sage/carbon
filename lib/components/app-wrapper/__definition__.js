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

var definition = new _definition2.default('app-wrapper', _2.default, {
  description: 'Wraps all components inside an overall container.',
  relatedComponentsNotes: '\n* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).\n* Navigating the hierarchy of the app? [Try Menu](/components/menu).\n* Laying out a page in columns? [Try Row](/components/row).\n ',
  propValues: {
    children: "This component will wrap its children within the width constraints of your application."
  },
  propTypes: {
    children: 'Node',
    className: 'String'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.'
  }
});

exports.default = definition;