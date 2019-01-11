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

var definition = new _definition2.default('dropdown-filter', _2.default, {
  description: 'Selects one option from a very long list, with the ability to filter and create new items.',
  designerNotes: '\n* The user can select an item using the mouse or keyboard, and also enter a search term to filter the list items presented - this is particularly helpful for very long lists (e.g. a list of customers or suppliers).\n* Useful to show more than about 5 options.\n* The Create configuration allows the user to add a term they enter to the list.\n* The Suggest configuration removes the menu handle, and only shows options to the user once they enter 3 characters of a search term. For example, if users need to select from a very long list of business classification terms (e.g. SIC codes), showing a menu on field focus may mean users tend to choose from the top of the list, rather than filter and select the best option. This configuration makes the component behave more like a search field.\n* Use placeholder content like \u2018Please select\u2026\u2019 to make it clear to the user that the Dropdown is unset.\n* Consider a \u2018smart default\u2019 selection, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.\n  ',
  relatedComponentsNotes: '\n* Dropdown filter with Ajax? [Try Dropdown Filter Ajax](/components/dropdown-ajax).\n* Don\u2019t need to filter or add new items? [Try Dropdown](/components/dropdown).\n* Choosing one option from a shorter list? [Try Radio Button](/components/radio-button).\n* Choosing more than one option? [Try Checkbox](/components/checkbox).\n* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).\n ',
  hiddenProps: ['options'],
  toggleFunctions: ['create'],
  js: 'function getOptions() {\n  return ImmutableHelper.parseJSON([{\n    id: "1", name: "Orange"\n  }, {\n    id: "2", name: "Blue"\n  }, {\n    id: "3", name: "Green"\n  }, {\n    id: "4", name: "Black"\n  }, {\n    id: "5", name: "Yellow"\n  }, {\n    id: "6", name: "White"\n  }, {\n    id: "7", name: "Magenta"\n  }, {\n    id: "8", name: "Cyan"\n  }, {\n    id: "9", name: "Red"\n  }, {\n    id: "10", name: "Grey"\n  }, {\n    id: "11", name: "Purple"\n  }]);\n};',
  propTypes: {
    options: "Object",
    cacheVisibleValue: "Boolean",
    value: "String",
    create: "Function",
    createText: "String",
    createIconType: "String",
    freetext: "Boolean",
    suggest: "Boolean"
  },
  propValues: {
    options: 'getOptions()'
  },
  propDescriptions: {
    cacheVisibleValue: "The dropdown will continually find the name during re-render, set this to true to only re-find the name if the value has actually changed.",
    options: "The options for the dropdown. This needs to be an Immutable Map.",
    value: "The currently selected value of the input.",
    create: "When defined will show a create button, which on click will trigger this callback with currently typed value.",
    createText: "When defined this prop will customize the text 'Create New' inside the create button.",
    createIconType: "Leave alone for default 'add' Icon, choose any Icon type available in the Icon component, or set to 'none' to hide the Icon.",
    freetext: "When enabled will allow the user to type freely into the field, without their filter having to match a result.",
    suggest: "When enabled will enforce that the user needs to type something before they will see any results."
  }
});

definition.isAnInput();

exports.default = definition;