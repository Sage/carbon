'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _component = require('./../../../demo/actions/component');

var _component2 = _interopRequireDefault(_component);

var _definition__ = require('./table-row/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

var _definition__3 = require('./table-cell/__definition__');

var _definition__4 = _interopRequireDefault(_definition__3);

var _definition__5 = require('./table-header/__definition__');

var _definition__6 = _interopRequireDefault(_definition__5);

var _definition__7 = require('./table-subheader/__definition__');

var _definition__8 = _interopRequireDefault(_definition__7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: see if we can remove the need for this - this populates the data by
// fetching it from the mock service
setTimeout(function () {
  // trigger action to init table with data
  _component2.default.updateTable();
  // we currently delay this update incase the xhr mock is disabled (ie on a doc page)
}, 1000);

var definition = new _definition2.default('table', _.Table, {
  description: 'A table of relational data to view or interact with.',
  designerNotes: '\n* Shows relational data to the user.\n* The content of rows and columns can be plain or styled text, Icons, or even inputs. Achieve this by nesting components inside a Table component.\n* Don\u2019t add too many columns for the user\u2019s available viewport width. Aiming for a screen width of 1366 pixels is a good target, but also consider how your table may look for tablet or mobile devices. Avoid the need for horizontal scrolling, either on the page as a whole, or within a Table component.\n* To save space, you could show multiple lines of data within a cell (e.g. the constituents of an address).\n* If there is likely to be a large number of rows, you can specify how many rows to show, and whether to add a pagination control to the bottom of the table. Consider the data load on your application and infrastructure to decide this. Some applications apply this configuration as an application-wide setting.\n* The Selectable configuration places a checkbox at the start of each row, and the ability for a user to select one or more rows. This is useful to allow the user to perform single or batch actions.\n* The Highlightable configuration allows the user to click an option, and for the option to be marked visually. This could be useful if the user can select an option which then loads in a Sidebar, for example.\n',
  associatedDefinitions: [_definition__2.default, _definition__4.default, _definition__6.default, _definition__8.default],
  dataVariable: 'tableData',
  propValues: {
    caption: 'Country and Country Codes',
    highlightable: false,
    onChange: _component2.default.updateTable,
    paginate: false,
    selectable: false,
    shrink: false,
    showPageSizeSelection: false
  }
});

definition.isATable();

exports.default = definition;