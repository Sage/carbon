'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _optionsHelper = require('../../utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition3 = require('./slide/definition');

var _definition4 = _interopRequireDefault(_definition3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('carousel', _.Carousel, {
  description: 'Steps through a series of images.',
  designerNotes: '\n* Presents a series of images which the user can step through one-by-one, or quickly jump to a particular step.\n* Useful for showcasing a set of new features, for example.\n ',
  associatedDefinitions: [_definition4.default],
  propTypes: {
    children: 'Node',
    className: 'String',
    initialSlideIndex: 'Number || String'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    initialSlideIndex: 'Which slide the component should initialize with.'
  }
});

definition.addChildByDefinition(_definition4.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide One</h1>'
});

definition.addChildByDefinition(_definition4.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Two</h1>'
});

definition.addChildByDefinition(_definition4.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Three</h1>'
});

exports.default = definition;