'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('textarea', _2.default, {
  description: 'Captures more than one line of text.',
  designerNotes: '\n* Useful for collecting a significant amount of text (e.g. notes about clients, or a short email message).\n* Only handles plain text at this time - not markup or markdown, but it does handle line breaks.\n* If content in a textarea is read-only, remove the field border so it appears as static text.\n* Use placeholder text to give the user context or examples of what to write.\n  ',
  relatedComponentsNotes: '\n* Just a single line of text? [Try Textbox](/components/textbox).\n',
  type: 'form',
  propRequires: {
    enforceCharacterLimit: 'characterLimit'
  },
  propDescriptions: {
    characterLimit: "Displays a character count to inform the user how many characters they have used from a recommended amount.",
    enforceCharacterLimit: "Enforces the maximum number of characters.",
    expandable: "Makes the textarea automatically expand depending on the amount of text the user inputs."
  },
  propTypes: {
    characterLimit: "String",
    enforceCharacterLimit: "Boolean",
    expandable: "Boolean"
  }
});

definition.isAnInput();

exports.default = definition;