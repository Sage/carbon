'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('settings-row', _2.default, {
  description: 'Sets up a column-based UI layout with explanatory text and UI controls.',
  designerNotes: '\n* Useful to create a series of rows with a heading, explanatory text, and UI controls in each row.\n* A good example is a settings page, or step-by-step wizard.\n  ',
  relatedComponentsNotes: '\n* Need an overall container? [Try App Wrapper](/components/app-wrapper).\n* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).\n* Laying out a page in columns? [Try Row](/components/row).\n ',
  propTypes: {
    children: "Node",
    description: "String",
    divider: "Boolean",
    title: "String"
  },
  propValues: {
    children: "Content for settings.",
    description: "This provides more information about what this group of settings are for.",
    title: "A Group of Settings"
  },
  propDescriptions: {
    children: "This component supports children.",
    description: "A short description about the group of settings.",
    divider: "Shows a divider below the component.",
    title: "A title for this group of settings."
  }
});

exports.default = definition;