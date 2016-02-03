'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tableRow = require('./../table-row');

var _tableRow2 = _interopRequireDefault(_tableRow);

var _lodash = require('lodash');

/**
 * InputGrid is a component to display and edit a collection of data or line items.
 *
 * The component expects data to be provided to it as an Immutable object
 * (https://facebook.github.io/immutable-js/). It also requires each line item
 * to have a property of `_row_id`. To easily add row IDs to your data, run your
 * JSON through the ImmutableHelper `parseJSON` method.
 *
 * == How to use an InputGrid in a component:
 *
 * In your file:
 *
 *   import InputGrid from 'carbon/lib/components/input-grid';
 *
 * To render the InputGrid:
 *
 *   // Define which fields the grid should render. The name of the input should
 *   // match the key in the data structure.
 *   let lineItemFields = [
 *     <Textbox name='name' />,
 *     <Textbox name='description' />
 *   ];
 *
 *   <InputGrid
 *     name="line_items"
 *     data={ data.get('line_items') }
 *     fields={ lineItemFields }
 *     updateRowHandler={ Action.lineItemUpdated }
 *     deleteRowHandler={ Action.lineItemDeleted } />
 *
 * You can optionally pass additional HTML classes for each column, add the classes
 * to the input:
 *
 *   let lineItemFields = [
 *     <Textbox name='name' columnClasses='foo' />,
 *     <Textbox name='description' />
 *   ];
 *
 *   <InputGrid
 *     name="line_items"
 *     data={ data.get('line_items') }
 *     fields={ lineItemFields }
 *     updateRowHandler={ Action.lineItemUpdated }
 *     deleteRowHandler={ Action.lineItemDeleted } />
 *
 * You can optionally pass fields to render in a gutter along the bottom of the
 * grid:
 *
 *   // the key should match the input name for the relevant column
 *   let gutterFields = {
 *     description: <Textbox name='description_gutter' />
 *   };
 *
 *   <InputGrid
 *     ...
 *     gutter={ gutterFields } />
 *
 * @class InputGrid
 * @constructor
 * @extends React.Component
 */

var InputGrid = (function (_React$Component) {
  _inherits(InputGrid, _React$Component);

  function InputGrid() {
    var _this = this;

    _classCallCheck(this, InputGrid);

    _get(Object.getPrototypeOf(InputGrid.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      /**
       * Determines if the placeholder should be rendered or not.
       *
       * @property placeholder
       * @type {Boolean}
       */
      placeholder: true
    };
    this.placeholderID = new Date().getTime();
    this.childrenHaveChanged = false;

    this.buildRows = function () {
      var rows = [];

      // iterate through each line item in data
      _this.props.data.forEach(function (rowData) {
        // create a regular row for each line item
        rows.push(_this.regularRow(rowData));
      });

      // create a placeholder depending on the placeholder state
      if (_this.state.placeholder) {
        rows.push(_this.placeholderRow());
      }
      // if gutter fields have been defined, create a gutter row
      if (_this.props.gutter) {
        rows.push(_this.gutterRow());
      }

      return rows;
    };

    this.regularRow = function (rowData) {
      // the the _row_id (all line items should have a _row_id defined)
      var rowID = rowData.get('_row_id');

      // determine if the placeholder has now been converted to a regular row, if
      // it has then generate a new ID to use for the placeholder row.
      if (_this.placeholderID == rowID) {
        _this.placeholderID = new Date().getTime();
      }

      return _react2['default'].createElement(_tableRow2['default'], {
        name: _this.props.name,
        key: rowID,
        row_id: rowID,
        data: rowData,
        fields: _this.props.fields,
        forceUpdate: _this.childrenHaveChanged,
        deleteRowHandler: _this.props.deleteRowHandler,
        updateRowHandler: _this.props.updateRowHandler
      });
    };

    this.gutterRow = function () {
      return _react2['default'].createElement(_tableRow2['default'], {
        key: 'gutter',
        fields: _this.props.fields,
        forceUpdate: _this.childrenHaveChanged,
        gutterFields: _this.props.gutter
      });
    };

    this.placeholderRow = function () {
      return _react2['default'].createElement(_tableRow2['default'], {
        name: _this.props.name,
        key: _this.placeholderID,
        placeholder: 'true',
        forceUpdate: _this.childrenHaveChanged,
        row_id: _this.placeholderID,
        fields: _this.props.fields,
        updateRowHandler: _this.props.updateRowHandler
      });
    };

    this.buildHeader = function () {
      var headings = [];

      // add an empty header for the actions column
      headings.push(_react2['default'].createElement('th', { key: 'actions', className: 'ui-input-grid__header-cell' }));

      // iterate through each field to build a header for it
      _this.props.fields.forEach(function (field) {
        var columnClasses = "ui-input-grid__header-cell";

        // add any additional classes for this column
        if (field.props.columnClasses) {
          columnClasses += ' ' + field.props.columnClasses;
        }

        // add the header for this column
        headings.push(_react2['default'].createElement(
          'th',
          { hidden: field.props.hidden, className: columnClasses, key: field.props.name },
          tableHeaderName(field.props.label)
        ));
      });

      return headings;
    };
  }

  /**
   * Converts a string into a title case string.
   *
   * @method tableHeaderName
   * @param {String} value unformatted title string
   * @private
   * @return {String} The converted value
   */

  _createClass(InputGrid, [{
    key: 'shouldComponentUpdate',

    /**
     * Always returns true, but determines if any children have updated to force
     * update any child row components (this allows for easier diff checking within
     * the TableRow component).
     *
     * @method shouldComponentUpdate
     * @param {Object} nextProps new props passed to component
     * @return {Boolean} true if the component should update
     */
    value: function shouldComponentUpdate(nextProps) {
      this.childrenHaveChanged = false;

      // Detect if either the number of child fields has changed or if any props
      // on the child fields have changed.
      if (hasNumOfChildrenChanged(this.props, nextProps) || hasPropsOfChildrenChanged(this.props, nextProps)) {
        this.childrenHaveChanged = true;
      }

      return true;
    }

    /**
     * Ensures the form has knowledge of the InputGrid, to handle validation.
     *
     * @method componentWillMount
     * @return {void}
     */
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.context.form) {
        return false;
      }
      this.context.form.attachToForm(this, { table: true });
    }

    /**
     * Ensures the form no longer knows about the InputGrid if it is removed.
     *
     * @method componentWillUnmount
     * @return {void}
     */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.context.form) {
        return false;
      }
      this.context.form.detachFromForm(this, { table: true });
    }

    /**
     * Builds the rows required for the grid, based on the fields supplied to the
     * grid and it's data.
     *
     * @method buildRows
     * @return {Array} The rows to render in the grid
     */
  }, {
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2['default'].createElement(
        'table',
        { className: 'ui-input-grid' },
        _react2['default'].createElement(
          'thead',
          null,
          _react2['default'].createElement(
            'tr',
            { className: 'ui-input-grid__header' },
            this.buildHeader()
          )
        ),
        _react2['default'].createElement(
          'tbody',
          null,
          this.buildRows()
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * The name should match the key in your data in which the grid's data is stored.
       *
       * @property name
       * @type {String}
       */
      name: _react2['default'].PropTypes.string.isRequired,

      /**
       * The data to display in the table. This should be an Immutable object.
       *
       * @property data
       * @type {Object}
       */
      data: _react2['default'].PropTypes.object.isRequired,

      /**
       * A callback for when a data change action is triggered.
       *
       * @property updateRowHandler
       * @type {Function}
       */
      updateRowHandler: _react2['default'].PropTypes.func.isRequired,

      /**
       * A callback for when a row delete action is triggered.
       *
       * @property deleteRowHandler
       * @type {Function}
       */
      deleteRowHandler: _react2['default'].PropTypes.func.isRequired,

      /**
       * The fields to display in the table.
       *
       * @property fields
       * @type {Array}
       */
      fields: _react2['default'].PropTypes.array.isRequired,

      /**
       * Any fields to display in a gutter along the bottom of the table.
       *
       * @property gutter
       * @type {Object}
       */
      gutter: _react2['default'].PropTypes.object,

      /**
       * An object mapping additional classes to display on columns.
       *
       * @property columnClasses
       * @type {Object}
       */
      columnClasses: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      /**
       * Provides methods/properties from the form to the component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property form
       * @type {Object}
       */
      form: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  return InputGrid;
})(_react2['default'].Component);

function tableHeaderName(value) {
  return (0, _lodash.startCase)(value);
}

/**
 * Determines if the number of child fields have changed.
 *
 * @method hasNumOfChildrenChanged
 * @param {Object} prevProps this.props
 * @param {Object} nextProps new props passed to component
 * @private
 * @return {Boolean} Whether the number of children has changed
 */
function hasNumOfChildrenChanged(prevProps, nextProps) {
  var prevNumOfChildren = prevProps.fields.length,
      nextNumOfChildren = nextProps.fields.length;

  if (prevNumOfChildren != nextNumOfChildren) {
    return true;
  }

  return false;
}

/**
 * Determines if any props have changed on the fields.
 *
 * @method hasPropsOfChildrenChanged
 * @param {Object} prevProps this.props
 * @param {Object} nextProps new props passed to the component
 * @private
 * @return {Boolean} Whether the props have changed on the fields
 */
function hasPropsOfChildrenChanged(prevProps, nextProps) {
  for (var key in nextProps.fields) {
    var prevField = prevProps.fields[key],
        nextField = nextProps.fields[key];

    // compare the two fields properties
    if (!(0, _lodash.isEqual)(prevField.props, nextField.props)) {
      return true;
    }
  }

  return false;
}

exports['default'] = InputGrid;
module.exports = exports['default'];

/**
 * Stores the ID currently used for the placeholder row.
 *
 * @property placeholderID
 * @type {Integer}
 * @default new Date().getTime()
 */

/**
 * Stores a flag for whether the children have changed within the grid.
 *
 * @property childrenHaveChanged
 * @type {Boolean}
 * @default false
 */

/**
 * Builds a regular row based on a line item of data.
 *
 * @method regularRow
 * @param {Object} rowData The data to supply to the row's fields
 * @return {Object} The constructed row
 */

/**
 * Build a row to be rendered along the bottom of the grid.
 *
 * @method gutterRow
 * @return {Object} The constructed gutter row
 */

/**
 * Build a row to be used as a placeholder in the grid.
 *
 * @method placeholderRow
 * @return {Object} The constructed placeholder row
 */

/**
 * Builds a header to run across the top of the grid.
 *
 * @method buildHeader
 * @return {Object} The constructed header
 */