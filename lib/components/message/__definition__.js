'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('./../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('message', _2.default, {
  description: 'A longer message which stays on screen to read and interpret.',
  designerNotes: '\n* Presents a static message which stays on screen.\n* Useful for messages which are longer or more important, where the user needs time to interpret them, or might need to refer back to them during an activity.\n* Various types are available. \u2018Error\u2019 and \u2018Success\u2019 are by far the most useful - others are present for completeness by may not be practically used very often:\n* __Error__ - tells the user about a negative outcome that has already happened. Try to focus the message text on the action the user needs to take to be successful, rather than what went wrong.\n* __Help__ - not frequently used.\n* __Info__ - gives context or advice to the user where there\u2019s no risk of a negative outcome.\n* __Maintenance__ - warns the user if a particular service or feature may go offline shortly.\n* __New__ - highlights a new feature to the user.\n* __Success__ - indicates that an activity was successful. A good example could also present the user with onward options, such as \u2018View a list of items\u2019 or \u2018Create another\u2019.\n* __Warning__ - warns the user about a potential negative outcome that hasn\u2019t happened yet.\n* The Transparent configuration is useful if you\u2019d like the message to be more visually subtle, perhaps in a Dialog.\n  ',
  relatedComponentsNotes: '\n* Simple positive or negative confirmation? [Try Flash](/components/flash).\n* Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast).\n* Error or warning message that interrupts activity? [Try Alert](/components/alert).\n ',
  type: 'notification',
  toggleFunctions: ['onDismiss'],
  propOptions: {
    as: _optionsHelper2.default.colors
  },
  propValues: {
    children: 'This is some information from the Message Component. This can be a string or some custom JSX',
    open: true
  },
  propTypes: {
    as: 'String',
    children: 'Node',
    className: 'String',
    border: 'Boolean',
    onDismiss: 'Function',
    open: 'Boolean',
    roundedCorners: 'Boolean',
    title: 'String',
    transparent: 'Boolean'
  },
  propDescriptions: {
    as: 'Sets the theme of the notification. Possible values include: ' + _optionsHelper2.default.colors.join(', '),
    border: 'A boolean which determines if the borders should be shown',
    children: 'The message content',
    className: 'Set custom classes on the component',
    onDismiss: 'A callback for when the notification is dismissed. You can use this prop to close the notification',
    open: 'A boolean to control the open/closed state of the notification',
    roundedCorners: 'A boolean which rounds the corners of the message when true',
    title: 'Set the message title',
    transparent: 'Determines if the message background is transparent or filled by the `as` property color'
  }
});

exports.default = definition;