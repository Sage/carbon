'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('heading', _2.default, {
  description: 'The titles of a page and its sections.',
  designerNotes: '\n* A standard page or section header, with a range of options, such as a help link presented as an icon, a sub-heading, a\n \u2018Back\u2019 icon, and visual dividers and separators.\n* Make sure that the colour of all text has a contrast ratio of at least 4.5.1, to meet the [WCAG 2.0 AA standard]\n(https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) for text less than 19px in size. Webaim\n have a good online [Contrast Checker](http://webaim.org/resources/contrastchecker/).\n  ',
  relatedComponentsNotes: '\n* Simple text content? [Try Content](/components/content).\n* Prominent text callout? [Try Detail](/components/detail).\n ',
  type: 'layout',
  propTypes: {
    children: 'Node',
    className: 'String',
    title: 'String',
    titleId: 'String',
    subheader: 'String',
    subtitleId: 'String',
    help: 'String',
    helpLink: 'String',
    backLink: 'String',
    divider: 'Boolean',
    separator: 'Boolean'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    title: 'Sets the title for the heading.',
    titleId: 'Sets the title id for the heading.',
    subheader: 'Sets the subheader for the heading.',
    subtitleId: 'Sets the subtitle id for the heading.',
    help: 'Sets the help text for the heading.',
    helpLink: 'Sets the help url for the heading.',
    backLink: 'Defines the back button link and toggles its visibility if set.\n    It can also be a function, which will be triggered when the link\'s onClick event is triggered.',
    divider: 'Adds a divider below the heading and the content.',
    separator: 'Adds a separator between the title and subheader.'
  },
  propValues: {
    title: 'Heading Component',
    subheader: 'Subheading'
  }
});

exports.default = definition;