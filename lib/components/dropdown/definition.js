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

var definition = new _definition2.default('dropdown', _2.default, {
  description: 'Selects one option from a very long list.',
  designerNotes: '\n* Behaves like a simple browser menu control - the user can select an item using the mouse or keyboard.\n* Useful to show more than about 5 options.\n* Use placeholder content like \u2018Please select\u2026\u2019 to make it clear to the user that the Dropdown is unset.\n* Consider a \u2018smart default\u2019 selection, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.\n  ',
  relatedComponentsNotes: '\n* Filtering menu options to find the right one? [Try Dropdown Filter](/components/dropdown-filter).\n* Adding a new option within the menu? [Try Dropdown Filter](/components/dropdown-filter).\n* Choosing one option from a shorter list? [Try Radio Button](/components/radio-button).\n* Choosing more than one option? [Try Checkbox](/components/checkbox).\n* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).\n ',
  hiddenProps: ['options'],
  js: 'function getOptions() {\n  return ImmutableHelper.parseJSON([{\n    id: "1", name: "Orange"\n  }, {\n    id: "2", name: "Blue"\n  }, {\n    id: "3", name: "Green"\n  }, {\n    id: "4", name: "Black"\n  }, {\n    id: "5", name: "Yellow"\n  }, {\n    id: "6", name: "White"\n  }, {\n    id: "7", name: "Magenta"\n  }, {\n    id: "8", name: "Cyan"\n  }, {\n    id: "9", name: "Red"\n  }, {\n    id: "10", name: "Grey"\n  }, {\n    id: "11", name: "Purple"\n  }]);\n};',
  propTypes: {
    options: "Object",
    cacheVisibleValue: "Boolean",
    value: "String"
  },
  propValues: {
    options: 'getOptions()'
  },
  propDescriptions: {
    cacheVisibleValue: "The dropdown will continually find the name during re-render, set this to true to only re-find the name if the value has actually changed.",
    options: "The options for the dropdown. This needs to be an Immutable Map.",
    value: "The currently selected value of the input."
  }
});

definition.isAnInput();

exports.default = definition;