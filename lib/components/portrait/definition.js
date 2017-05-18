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

var definition = new _definition2.default('portrait', _2.default, {
  description: 'Represents a person with their initials or an avatar.',
  designerNotes: '\n* Useful to represent a person, user, or organisation.\n* Use initials rather than an avatar if you prefer.\n* Works with [Gravatar](http://en.gravatar.com/) as a source of avatars.\n  ',
  relatedComponentsNotes: '\n* Combining Portrait with some text? [Try Profile](/components/profile).\n ',
  propOptions: {
    size: _optionsHelper2.default.sizesFull,
    shape: _optionsHelper2.default.shapesVaried
  },
  propTypes: {
    size: "String",
    src: "String",
    gravatar: "String",
    alt: "String",
    shape: "String",
    initials: "String",
    darkBackground: "Boolean"
  },
  propDescriptions: {
    size: "Defines the size of the Portrait.",
    src: "Define an image source.",
    gravatar: "Define an email address registered with gravatar.",
    alt: "Defines the alt HTML string.",
    shape: "Defines the shape of the Portrait.",
    initials: "Define some initials to render in the Portrait.",
    darkBackground: "Switch to a dark background (requires a re-render)."
  }
});

exports.default = definition;