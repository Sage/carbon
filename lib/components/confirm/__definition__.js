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

var definition = new _definition2.default('confirm', _2.default, {
  description: 'Confirms or cancels an action.',
  designerNotes: '\n* Shows a static message in a dialog which asks the user to confirm or cancel an action they\u2019ve initiated.\n* Useful to confirm actions which may be difficult to undo, or potentially harmful.\n* Include a Message component within the Alert component (a warning Message component may be particularly useful for a potentially harmful choice), use plain text, or apply a standard Carbon Error or Warning icon.\n* This component has the same options and properties as the Dialog component.\n* A good example could be confirming deletion of a large number of records.\n  ',
  relatedComponentsNotes: '\n* Simple positive or negative confirmation? [Try Flash](/components/flash).\n* Longer message which stays on-screen? [Try Message](/components/message).\n* Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast).\n* Error or warning message that interrupts activity? [Try Alert](/components/alert).\n* Simple task in context? [Try Dialog](/components/dialog).\n ',
  propOptions: {
    size: _optionsHelper2.default.sizesFull
  },
  propValues: {
    title: 'Are you sure?',
    children: 'This is an example of a confirm.'
  },
  propTypes: {
    cancelLabel: "String",
    confirmLabel: "String",
    onConfirm: "Function",
    showCloseIcon: "Boolean",
    size: "String",
    subtitle: "String",
    title: "String"
  },
  propDescriptions: {
    cancelLabel: "Define custom text for the cancel button.",
    confirmLabel: "Define custom text for the confirm button.",
    onConfirm: "A callback when the user selects confirm.",
    showCloseIcon: "Set this prop to false to hide the close icon within the dialog.",
    size: "Change this prop to set the dialog to a specific size. Possible values include: " + _optionsHelper2.default.sizesFull.join(", "),
    subtitle: "Controls the subtitle of the dialog.",
    title: "Controls the main title of the dialog."
  }
});

definition.stubAction('onConfirm', 'open', 'false');

definition.isAModal();

exports.default = definition;