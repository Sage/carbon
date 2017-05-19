'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('i18n-component', _2.default, {
  description: 'Displays a translation from an i18n file.',
  designerNotes: '\n* Internationalization (i18n) means apps can be localized for languages and cultures easily.\n* This component displays a single text translation.\n* You can use this component with any other component that displays text.\n ',
  js: 'I18n.translations.en.my = {\n  example: \'# My __example__ translation.\'\n};',
  hiddenProps: ["options"],
  propRequires: {
    inline: 'markdown'
  },
  propTypes: {
    markdown: "Boolean",
    inline: "Boolean",
    scope: "String",
    options: "Object"
  },
  propDescriptions: {
    markdown: "Parse the string as markdown.",
    inline: "Renders markdown as inline (less tags).",
    scope: "The I18n scope.",
    options: "Additional options to pass to I18n."
  },
  propValues: {
    scope: "my.example"
  }
});

// need to manually set this one due to kebabcase working unexpectedly
definition.key = "i18n-component";

exports.default = definition;