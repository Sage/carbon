'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('mount-in-app', _2.default, {
  description: 'Mounts a component at a specific target in the DOM.',
  designerNotes: '\n* Useful to mount any Carbon component at a specific target in the DOM.\n ',
  hiddenProps: ['children', 'targetId'],
  propValues: {
    children: "<div>Content!</div>",
    targetId: "carbon-demo"
  },
  propTypes: {
    targetId: "String"
  },
  propDescriptions: {
    targetId: "The HTML ID in which to render the component."
  }
});

exports.default = definition;