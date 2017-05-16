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

var definition = new _definition2.default('toast', _2.default, {
  description: 'A longer, timely message that the user must dismiss, but doesn\u2019t interrupt their activity.',
  designerNotes: '\n* Presents a message in a dialog at the top-right of the screen that animates in. The user can manually dismiss it, and it animates out.\n* Useful for instant notifications, or information which is time sensitive (e.g. a \u2018push notification\u2019 style). If the message isn\u2019t time sensitive, consider the Message component.\n* The message stays on-screen until dismissed, giving the user time to interpret the message.\n* Various types are available. \u2018Error\u2019 and \u2018Success\u2019 are by far the most useful - others are present for completeness by may not be practically used very often:\n* __Error__ - tells the user about a negative outcome that has already happened. Try to focus the message text on the action the user needs to take to be successful, rather than what went wrong (e.g. \u2018Payment failed, please try again\u2019).\n* __Help__ - not frequently used.\n* __Info__ - gives context or advice to the user where there\u2019s no risk of a negative outcome (e.g. \u2018Your monthly statements are ready to review\u2019).\n* __Maintenance__ - warns the user if a particular service or feature may go offline shortly.\n* __New__ - highlights a new feature to the user (e.g. \u2018You can now send batch statements in Sage One\u2019).\n* __Success__ - indicates that an activity was successful (e.g. \u2018Your subscription upgrade was successful\u2019).\n* __Warning__ - warns the user about a potential negative outcome that hasn\u2019t happened yet.\n  ',
  relatedComponentsNotes: '\n* Simple positive or negative confirmation? [Try Flash](/components/flash).\n* Longer message which stays on-screen? [Try Message](/components/message).\n* Error or warning message that interrupts activity? [Try Alert](/components/alert).\n',
  type: 'notification',
  toggleFunctions: ["onDismiss"],
  propOptions: {
    as: _optionsHelper2.default.colors
  },
  propValues: {
    children: 'test',
    open: true
  },
  propTypes: {
    as: "String",
    onDismiss: "Function",
    open: "Boolean"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + _optionsHelper2.default.colors.join(", "),
    onDismiss: "A callback for when the notification is dismissed. You can use this prop to close the notification.",
    open: "A boolean to control the open/closed state of the notification."
  },
  openPreview: true
});

exports.default = definition;