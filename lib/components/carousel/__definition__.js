'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition__ = require('./slide/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('carousel', _.Carousel, {
  description: 'Steps through a series of images.',
  designerNotes: '\n* Presents a series of images which the user can step through one-by-one, or quickly jump to a particular step.\n* Useful for showcasing a set of new features, for example.\n ',
  associatedDefinitions: [_definition__2.default],
  propTypes: {
    children: 'Node',
    className: 'String',
    initialSlideIndex: 'Number',
    slideIndex: 'Number',
    enableSlideSelector: 'Boolean',
    enablePreviousButton: 'Boolean',
    enableNextButton: 'Boolean',
    onSlideChange: 'Function'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    initialSlideIndex: 'Which slide the component should initialize with.',
    slideIndex: 'Set this prop to change slide',
    enableSlideSelector: 'Set this prop to false to hide the slide selector.',
    enablePreviousButton: 'Set this prop to false to hide the previous button',
    enableNextButton: 'Set this prop to false to hide the next button',
    onSlideChange: 'Action to be called on slide change.' + ' It will receive the slide index and the transition direction as params.'
  },
  propOptions: {
    initialSlideIndex: [0, 1, 2, 3, 4],
    slideIndex: [0, 1, 2, 3, 4]
  }
});

definition.addChildByDefinition(_definition__2.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide One</h1>'
});

definition.addChildByDefinition(_definition__2.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Two</h1>'
});

definition.addChildByDefinition(_definition__2.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Three</h1>'
});

definition.addChildByDefinition(_definition__2.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Four</h1>'
});

definition.addChildByDefinition(_definition__2.default, {
  children: '<h1 style={{ textAlign: "center" }}>Slide Five</h1>'
});

exports.default = definition;