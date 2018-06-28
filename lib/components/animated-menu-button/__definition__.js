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

var definition = new _definition2.default('animated-menu-button', _2.default, {
  description: 'Quick access to a number of especially useful hyperlinks.',
  designerNotes: '\n* A quick way for users to access a number of useful hyperlinks in context.\n* This pattern tends to be used as a quick way of allowing the user to create a range of new items (e.g. New Sales Invoice, New Quote, New Payment).\n* Try not to mix navigation options with action options.\n* Try not to create any duplication between the Menu component, and this component.\n  ',
  relatedComponentsNotes: '\n* Choosing between variants of the same page, or filtering content? [Try Tabs](/components/tabs).\n* Positioning your primary navigation? [Try Navigation Bar](/components/navigation-bar).\n* Navigating the hierarchy of the app? [Try Menu](/components/menu).\n  ',
  hiddenProps: ["children"],
  propOptions: {
    direction: _optionsHelper2.default.alignBinary,
    size: _optionsHelper2.default.sizesFull
  },
  propTypes: {
    className: 'String',
    children: 'Node',
    direction: 'String',
    label: 'String',
    size: 'String'
  },
  propDescriptions: {
    className: 'Classes to apply to the component.',
    children: 'This component supports children.',
    direction: 'The direction in which the component should expand.',
    label: 'An optional title for the component.',
    size: 'The size in which the component should expand to.'
  },
  propValues: {
    children: '<Row>\n    <div>\n      <h2>1st Category</h2>\n      <p><Link>First Option</Link></p>\n      <p><Link>Another Option</Link></p>\n    </div>\n\n    <div>\n      <h2>2nd Category</h2>\n      <p><Link>First Option</Link></p>\n      <p><Link>Another Option</Link></p>\n    </div>\n\n    <div>\n      <h2>3rd Category</h2>\n      <p><Link>First Option</Link></p>\n      <p><Link>Another Option</Link></p>\n    </div>\n  </Row>',
    direction: 'right'
  }
});

exports.default = definition;