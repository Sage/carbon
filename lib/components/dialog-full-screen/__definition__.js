'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('dialog-full-screen', _2.default, {
  description: 'A full-width and full-height dialog overlaid on top of any page.',
  designerNotes: '\n* Useful to perform an action in context without navigating the user to a separate page.\n* Whilst a standard Dialog component\u2019s width might constrain what you can do, the full screen dialog uses the full width\n and height available.\n* A good example could be importing a large volume of data, and checking for errors, in the context of an underlying\n Table of data.\n  ',
  relatedComponentsNotes: '\n* Simple task in context? [Try Dialog](/components/dialog).\n* Need to refer back to the underlying page? [Try Sidebar](/components/sidebar).\n\n ',
  propValues: {
    title: 'Example Title for a DialogFullScreen',
    children: 'This is an example of a dialog full screen.'
  }
});

definition.isAModal();

exports.default = definition;