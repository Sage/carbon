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

var definition = new _definition2.default('dialog', _2.default, {
  description: 'A dialog box overlaid on top of any page.',
  designerNotes: '\n* Useful to perform an action in context without navigating the user to a separate page.\n* Several pre-set widths are available - the height of the dialog will flex to fit the content. It\u2019s best to avoid\n dialogs that are taller than the user\u2019s viewport height. Typical user viewport heights can be as little as 650 pixels.\n* Choose whether a dark tint is applied behind the dialog which helps to focus the user on the dialog.\n* A configuration shows a close icon at the top right of the Dialog. Sometimes users are more likely to click this than\n a traditional \u2018Cancel\u2019 button.\n  ',
  relatedComponentsNotes: '\n* Complex task that needs more space? [Try Dialog Full Screen](/components/dialog-full-screen).\n* Need to refer back to the underlying page? [Try Sidebar](/components/sidebar).\n ',
  propOptions: {
    size: _optionsHelper2.default.sizesFull
  },
  propValues: {
    title: 'Example Title for a Dialog',
    children: '<Form>This is an example of a dialog.</Form>'
  },
  propTypes: {
    autoFocus: 'Boolean',
    height: 'String',
    title: 'String',
    size: 'String',
    showCloseIcon: 'Boolean',
    subtitle: 'String',
    stickyFormFooter: 'Boolean'
  },
  propDescriptions: {
    autoFocus: 'When set to true the dialog will receive keyboard focus when it opens.',
    height: 'Sets a value for a specific height the dialog should take (for example "500px").',
    showCloseIcon: 'Set this prop to false to hide the close icon within the dialog.',
    size: 'Change this prop to set the dialog to a specific size. Possible values include:\n     ' + _optionsHelper2.default.sizesFull.join(', '),
    subtitle: 'Controls the subtitle of the dialog.',
    title: 'Controls the main title of the dialog.'
  }
});

definition.isAModal();

exports.default = definition;