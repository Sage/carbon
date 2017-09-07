'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _optionsHelper = require('./../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('spinner', _2.default, {
  description: 'Represents an activity in progress.',
  designerNotes: '\n* Various colours and sizes are available - the colours match the states for Messages, Toasts, and other components.\n* Created with HTML and CSS rather than an animated graphic, which allows for easier customisation.\n* If the spinner is likely to appear for a long time, consider placing some dynamic messaging on-screen to reassure the user that something is in progress, and they shouldn\u2019t re-load the page manually.\n* Carbon doesn\u2019t feature a progress bar, as it\u2019s often difficult to accurately calculate when many processes will complete, and many are relatively fast.\n ',
  type: 'misc',
  propOptions: {
    as: _optionsHelper2.default.colors,
    size: _optionsHelper2.default.sizesFull
  },
  propTypes: {
    as: "String",
    size: "String"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + _optionsHelper2.default.colors.join(", "),
    size: "Name of size to pass to the spinner. Possible values include: " + _optionsHelper2.default.sizesFull.join(", ")
  }
});

exports.default = definition;