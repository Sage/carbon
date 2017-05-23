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

var _definition3 = require('./../button/definition');

var _definition4 = _interopRequireDefault(_definition3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('split-button', _2.default, {
  description: 'Related buttons that are shown on hover where one option is more important than the others.',
  designerNotes: '\n* Offers one more important action to the user, with some related actions also quickly accessible, but without taking up valuable space by showing them all separately.\n* But, users may not always discover the related items, and could miss out.\n* Useful to show about 5 options or less.\n* Only use this component for buttons that are very closely related (e.g. Save, Save and Email, Save and Print, Save and New).\n* Only use this component if one option is more generic or important than the others.\n  ',
  relatedComponentsNotes: '\n* Taking a single positive or negative action? [Try Button](/components/button).\n* Range of buttons all of the same importance? [Try Multi Action Button](/components/multi-action-button).\n* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).\n',
  propOptions: {
    as: _optionsHelper2.default.themesBinary
  },
  propTypes: {
    as: "String",
    text: "String",
    disabled: "Boolean"
  },
  propValues: {
    text: "Example Split Button"
  },
  propDescriptions: {
    as: "Primary or Secondary theme.",
    text: "Text for the main button.",
    disabled: "When enabled will disable the button."
  }
});

definition.addChildByDefinition(_definition4.default);
definition.addChildByDefinition(_definition4.default);
definition.addChildByDefinition(_definition4.default);

exports.default = definition;