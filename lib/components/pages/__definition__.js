'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition__ = require('./page/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.goToPage = function (ev) {
  window.Dispatcher.dispatch({
    actionType: window.ComponentConstants.UPDATE_DEFINITION,
    name: 'pages',
    prop: 'slideIndex',
    value: ev.target.name || '0'
  });
};

var definition = new _definition2.default('pages', _.Pages, {
  description: 'Allows to slide to different pages in a full screen dialog.',
  designerNotes: '',
  associatedDefinitions: [_definition__2.default],
  propTypes: {
    children: 'Node',
    className: 'String',
    slideIndex: 'Number'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    slideIndex: 'Set this prop to change slide'
  },
  wrap: 'DialogFullScreen',
  wrapProps: ['open', 'onCancel'],
  props: ['slideIndex'],
  propValues: {
    children: '<Page title={ <Heading title=\'My First Page\' /> }>\n    <Button onClick={ window.goToPage } name="1">\n      Go to next page.\n    </Button>\n  </Page>\n\n  <Page title={ <Heading title=\'My Second Page\' backLink={ window.goToPage } /> }>\n    <Button onClick={ window.goToPage } name="0">\n      Go to previous page.\n    </Button>\n  </Page>',
    slideIndex: 0
  },
  openPreview: true
});

definition.stubAction('onCancel', 'open', false);

exports.default = definition;