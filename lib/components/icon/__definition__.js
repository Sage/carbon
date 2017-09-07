'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _optionsHelper = require('utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('icon', _2.default, {
  description: 'An eye catching icon associated with a UI element or content item.',
  designerNotes: '\n* Carbon comes with about 50 standard icons to choose from. See the Icons page in the Style section.\n* A tooltip option is available within this component.\n* Many other components allow you to specify one of the standard Carbon icons to associate with them, for example, the Link component.\n  ',
  relatedComponentsNotes: '\n* Tooltip hovering on any component? [Try Tooltip](/components/tooltip).\n* Tooltip from a question mark icon? [Try Help](/components/help).\n* Moving the user to another location? [Try Link](/components/link).\n* After an image? [View Icons](/style/icons).\n ',
  propRequires: {
    bgShape: 'bgTheme',
    bgSize: 'bgTheme',
    tooltipAlign: 'tooltipMessage',
    tooltipPosition: 'tooltipMessage'
  },
  propValues: {
    type: 'tick'
  },
  propOptions: {
    bgShape: _optionsHelper2.default.shapes,
    bgSize: _optionsHelper2.default.sizesRestricted,
    bgTheme: _optionsHelper2.default.colors,
    tooltipAlign: _optionsHelper2.default.alignAroundEdges,
    tooltipPosition: _optionsHelper2.default.positions,
    type: _optionsHelper2.default.icons
  },
  propTypes: {
    bgShape: 'String',
    bgSize: 'String',
    bgTheme: 'String',
    className: 'String',
    tooltipAlign: 'String',
    tooltipMessage: 'String',
    tooltipPosition: 'String',
    type: 'String'
  },
  propDescriptions: {
    bgShape: 'The shape of the background.',
    bgSize: 'The size of the background.',
    bgTheme: 'The color/theme of the background.',
    className: 'Set custom classes on the component',
    tooltipAlign: 'The alignment of the tooltip.',
    tooltipMessage: 'A message to display as a tooltip to the icon.',
    tooltipPosition: 'The position of the tooltip.',
    type: 'The icon to render.'
  }
});

exports.default = definition;