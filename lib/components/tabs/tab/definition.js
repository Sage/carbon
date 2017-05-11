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
    tabId: "A unique ID to identify this specific tab.",
    title: "The title for this tab and it's button."
  }
});

exports.default = definition;