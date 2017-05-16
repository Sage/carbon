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

var definition = new _definition2.default('navigation-bar', _2.default, {
  description: 'Provides a container for your app\'s primary and secondary navigation.',
  designerNotes: '\n* Provides a container for [Menu](/components/menu) - together providing your app\'s primary and secondary navigation.\n* Everything can be contained within an [App Wrapper](/components/app-wrapper).\n  ',
  relatedComponentsNotes: '\n* Need an overall container? [Try App Wrapper](/components/app-wrapper).\n* Navigating the hierarchy of the app? [Try Menu](/components/menu).\n* Laying out a page in columns? [Try Row](/components/row).\n ',
  propOptions: {
    as: _optionsHelper2.default.themesBinary
  },
  propTypes: {
    as: "String"
  },
  propDescriptions: {
    as: "Primary or Secondary theme."
  }
});

exports.default = definition;