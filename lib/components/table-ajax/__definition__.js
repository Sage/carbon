'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _component = require('./../../../demo/actions/component');

var _component2 = _interopRequireDefault(_component);

var _definition__ = require('./../table/table-row/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

var _definition__3 = require('./../table/table-cell/__definition__');

var _definition__4 = _interopRequireDefault(_definition__3);

var _definition__5 = require('./../table/table-header/__definition__');

var _definition__6 = _interopRequireDefault(_definition__5);

var _definition__7 = require('./../table/table-subheader/__definition__');

var _definition__8 = _interopRequireDefault(_definition__7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('table-ajax', _.TableAjax, {
  description: 'Ajax control: A table of relational data to view or interact with.',
  designerNotes: '\n* This control is the same as [Table](/components/table), but uses Ajax.\n* Ajax loads data from a specified source as needed, rather than data in the page markup.\n ',
  associatedDefinitions: [_definition__2.default, _definition__4.default, _definition__6.default, _definition__8.default],
  dataVariable: 'tableAjaxData',
  propValues: {
    onChange: _component2.default.updateTableAjax
  },
  propTypes: {
    onAjaxError: 'Function',
    path: 'String'
  },
  propDescriptions: {
    onAjaxError: 'Callback function to handle XHR request errors',
    path: 'The path to make XHR requests to.'
  },
  requiredProps: ['path'],
  hiddenProps: ['onAjaxError', 'path']
});

definition.isATable();

exports.default = definition;