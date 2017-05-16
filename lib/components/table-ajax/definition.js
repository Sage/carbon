'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _component = require('./../../../demo/actions/component');

var _component2 = _interopRequireDefault(_component);

var _definition3 = require('./../table/table-row/definition');

var _definition4 = _interopRequireDefault(_definition3);

var _definition5 = require('./../table/table-cell/definition');

var _definition6 = _interopRequireDefault(_definition5);

var _definition7 = require('./../table/table-header/definition');

var _definition8 = _interopRequireDefault(_definition7);

var _definition9 = require('./../table/table-subheader/definition');

var _definition10 = _interopRequireDefault(_definition9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('table-ajax', _.TableAjax, {
  description: 'Ajax control: A table of relational data to view or interact with.',
  designerNotes: '\n* This control is the same as [Table](/components/table), but uses Ajax.\n* Ajax loads data from a specified source as needed, rather than data in the page markup.\n ',
  associatedDefinitions: [_definition4.default, _definition6.default, _definition8.default, _definition10.default],
  dataVariable: 'tableAjaxData',
  propValues: {
    onChange: _component2.default.updateTableAjax
  },
  propTypes: {
    path: "String"
  },
  propDescriptions: {
    path: "The path to make XHR requests to."
  },
  requiredProps: ['path'],
  hiddenProps: ['path']
});

definition.isATable();

exports.default = definition;