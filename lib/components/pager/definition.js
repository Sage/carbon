'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _optionsHelper = require('utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _component = require('./../../../demo/actions/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('pager', _2.default, {
  description: 'Steps through a series of pages within a table.',
  designerNotes: '\n* Useful to handle larger tables of data - clicking the forward or back arrows will step the user sequentially through the data loaded into the table.\n* The \'Show Page Size Selection\' configuration shows 10, 25, or 50 records on each page.\n  ',
  relatedComponentsNotes: '\n* Table of relational data? [Try Table](/components/table).\n* Table with Ajax? [Try Table](/components/table-ajax).\n ',
  type: 'form',
  hiddenProps: ['currentPage', 'pageSizeSelectionOptions'],
  propOptions: {
    pageSize: _optionsHelper2.default.pageSizes
  },
  propTypes: {
    currentPage: "String",
    totalRecords: "String",
    onPagination: "Function",
    pageSize: "String",
    showPageSizeSelection: "Boolean",
    pageSizeSelectionOptions: "Object"
  },
  propValues: {
    currentPage: 1,
    totalRecords: 100,
    onPagination: _component2.default.updatePagerCurrentPage
  },
  defaultProps: {
    pageSizeSelectionOptions: _optionsHelper2.default.pageSizes.join(", ")
  },
  propDescriptions: {
    currentPage: "The currently displayed page.",
    totalRecords: "The total number of records to paginate.",
    onPagination: "Callback triggered when the user changes page, use this to update the currentPage prop.",
    pageSize: "Number of records per page.",
    showPageSizeSelection: "Show/hide the options so a user can choose how many records to display per page.",
    pageSizeSelectionOptions: "Define custom options to display in page size selection. This has to be an immutable object."
  }
});

exports.default = definition;