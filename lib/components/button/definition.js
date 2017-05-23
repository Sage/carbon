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

var definition = new _definition2.default('button', _2.default, {
  description: 'Performs an action.',
  designerNotes: '\n* Avoid using buttons for navigation (taking the user somewhere else) - use them for performing an action or command.\n* Use a Primary configuration for positive actions that are the main goal for the user (e.g. Save, Submit, Continue).\n* Avoid placing Secondary actions on a form if you can.\n* If an action is particularly destructive (e.g. Delete or Clear), consider using Red configuration. It might be a good idea to show a confirmation dialog, or the ability to undo it too.\n* Try to create a single path to completion by aligning your action with your inputs.\n* You can disable a Button, but try to avoid this. If you need to, make it clear what the user needs to do in order to activate the Button. A good case for disabling an action is to prevent a form being submitted twice (e.g. on a payment page).\n  ',
  relatedComponentsNotes: '\n* Range of buttons where one is more important? [Try Split Button](/components/split-button).\n* Range of buttons all of the same importance? [Try Multi Action Button](/components/multi-action-button).\n* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).\n ',
  propOptions: {
    as: _optionsHelper2.default.themesBinary,
    theme: _optionsHelper2.default.buttonColors,
    size: _optionsHelper2.default.sizesRestricted
  },
  propTypes: {
    as: "String",
    children: "Node",
    disabled: "Boolean",
    theme: "String",
    size: "String"
  },
  propValues: {
    children: "Example Button"
  },
  propDescriptions: {
    as: "Choose between Primary or Secondary styling.",
    children: "This component supports children.",
    disabled: "Controls the disabled state of the button.",
    theme: "Choose between different colour themes for the button.",
    size: "Choose between various sizes for the button."
  }
});

exports.default = definition;