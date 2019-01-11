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

var _component = require('./../../../demo/actions/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('simple-color-picker', _2.default, {
  description: 'A small number of pre-set colour options to select from.',
  designerNotes: '\n* Choose from a small palette of pre-set colours, with indication of a currently selected colour.\n  ',
  relatedComponentsNotes: '\n* [Colors](/style/colors).\n ',
  hiddenProps: ['availableColors', 'selectedColor', 'name'],
  propTypes: {
    availableColors: "Array",
    selectedColor: "String",
    name: "String",
    onChange: "Function"
  },
  propValues: {
    availableColors: "['#00DC00', '#255BC7', '#ED1C5F']",
    name: "color",
    onChange: _component2.default.updateSimpleColorPickerSelected,
    selectedColor: "#00DC00"
  },
  propDescriptions: {
    availableColors: "An array of color choices to display.",
    selectedColor: "The currently selected color.",
    name: "The name to apply to the input.",
    onChange: "A callback triggered when a color is selected."
  }
});

exports.default = definition;