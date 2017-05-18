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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('profile', _2.default, {
  description: 'Represents a person with their initials or an avatar, and some text.',
  designerNotes: '\n* Combines the [Portrait](/components/portrait) and [Detail](/components/detail) components in a single configuration.\n* Useful to represent a person, user, or organisation.\n* Use initials rather than an avatar if you prefer.\n* Works with [Gravatar](http://en.gravatar.com/) as a source of avatars.\n  ',
  relatedComponentsNotes: '\n* Initials or avatar without text? [Try Portrait](/components/portrait).\n* Text without initials or avatar? [Try Detail](/components/detail).\n ',
  propValues: {
    name: "Andrew Tait",
    email: "andrew.tait@sage.com"
  },
  propTypes: {
    name: "String",
    email: "String",
    initials: "String",
    large: "Boolean"
  },
  propDescriptions: {
    name: "Define the name to display.",
    email: "Define the email to use (will check Gravatar for image).",
    initials: "Define initials to display if there is no Gravatar image.",
    large: "Enable a larger theme for the name."
  }
});

exports.default = definition;