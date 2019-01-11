'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('tab', _2.default, {
  type: 'layout',
  requiredProps: ["tabId", "title"],
  propTypes: {
    tabId: "String",
    title: "String"
  },
  propDescriptions: {
    'aria-labelledby': 'The id of the corresponding control that must be activated to show the tab.',
    role: 'The ARIA role of the component.',
    tabId: "A unique ID to identify this specific tab.",
    tabIndex: "Determines if the tab is tabbable using the keyboard.",
    title: "The title for this tab and it's button."
  }
});

exports.default = definition;