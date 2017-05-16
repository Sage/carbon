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

var _definition3 = require('./../button/definition');

var _definition4 = _interopRequireDefault(_definition3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('multi-action-button', _2.default, {
  description: 'Related buttons of equal importance that are shown on hover.',
  designerNotes: '\n* Offers related actions to the user, but without taking up valuable space by showing them separately.\n* But, users may not always discover them, and could miss out.\n* Useful to show about 5 options or less.\n* Only use this component for commands that are related (e.g. Export PDF, Export CSV).\n* Don\u2019t use this component if one option is more generic or important than the others.\n* Carbon has a Transparent configuration, with subtle visual style, which could be useful to present less important or infrequently used options to the user, without calling attention to them.\n  ',
  relatedComponentsNotes: '\n* Performing a single action? [Try Button](/components/button).\n* Range of buttons where one is more important? [Try Split Button](/components/split-button).\n* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).\n ',
  propOptions: {
    as: _optionsHelper2.default.themesBinary,
    align: _optionsHelper2.default.alignBinary
  },
  propTypes: {
    as: "String",
    text: "String",
    disabled: "Boolean",
    align: "String"
  },
  propValues: {
    text: "Example Multi Action Button"
  },
  propDescriptions: {
    as: "Primary or Secondary theme.",
    text: "Text for the main button.",
    disabled: "When enabled will disable the button.",
    align: "Aligns the buttons actions either to the left or right."
  }
});

definition.addChildByDefinition(_definition4.default);
definition.addChildByDefinition(_definition4.default);
definition.addChildByDefinition(_definition4.default);

exports.default = definition;