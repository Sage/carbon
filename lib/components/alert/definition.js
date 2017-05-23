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

var definition = new _definition2.default('alert', _2.default, {
  description: 'An important message that interrupts user activity, but can be dismissed.',
  designerNotes: '\n* Useful if a message is so important you\u2019d like to prevent any other activity until the user resolves it.\n* If the message isn\u2019t so important, or you want to avoid disrupting the user\u2019s activity, consider showing a static Message component in the underlying screen.\n* Include a Message component within the Alert component, use plain text, or apply a standard Carbon Error or Warning icon.\n* This component has the same options and properties as the Dialog component.\n  ',
  relatedComponentsNotes: '\n* Simple positive or negative confirmation? [Try Flash](/components/flash).\n* Longer message which stays on-screen? [Try Message](/components/message).\n* Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast).\n* Confirm or cancel an action I\u2019ve initiated? [Try Confirm](/components/confirm).\n* Simple task in context? [Try Dialog](/components/dialog).\n  ',
  propOptions: {
    size: _optionsHelper2.default.sizesFull
  },
  propValues: {
    title: 'Attention!',
    children: 'This is an example of a alert.'
  },
  propTypes: {
    title: "String",
    size: "String",
    showCloseIcon: "Boolean"
  },
  propDescriptions: {
    showCloseIcon: "Set this prop to false to hide the close icon within the dialog.",
    size: "Change this prop to set the dialog to a specific size. Possible values include: " + _optionsHelper2.default.sizesFull.join(", "),
    title: "Controls the main title of the dialog."
  }
});

definition.isAModal();

exports.default = definition;