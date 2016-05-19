'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilsCss = require('./../../utils/css');

var _utilsCss2 = _interopRequireDefault(_utilsCss);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _number = require('./../number');

var _number2 = _interopRequireDefault(_number);

var _dropdown = require('./../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _i18nJs = require("i18n-js");

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utilsHelpersEvents = require('./../../utils/helpers/events');

var _utilsHelpersEvents2 = _interopRequireDefault(_utilsHelpersEvents);

/**
 * A Pager widget.
 *
 * == How to use a Pager in a component:
 *
 * In your file
 *
 *   import Pager from 'carbon/lib/components/pager';
 *
 * To render a Pager:
 *
 *   <Pager currentPage='1' totalRecords='100' onPagination={ function(){} } />
 *
 * @class Pager
 */

var Pager = (function (_React$Component) {
  _inherits(Pager, _React$Component);

  function Pager() {
    var _this = this;

    _classCallCheck(this, Pager);

    _get(Object.getPrototypeOf(Pager.prototype), 'constructor', this).apply(this, arguments);

    this.state = {

      /**
       * Current page is held in state so the
       * user can use the input field
       *
       * New props always overide the currentPage
       *
       * @property currentPage
       * @type {String}
       */
      currentPage: this.props.currentPage
    };

    this.handleCurrentPageInputChange = function (ev) {
      _this.setState({ currentPage: ev.target.value });
    };

    this.handleCurrentPageKeyUp = function (ev) {
      if (_utilsHelpersEvents2['default'].isEnterKey(ev)) {
        _this.emitChangeCallback('input', ev);
      }
    };

    this.emitChangeCallback = function (element, ev) {
      var newPage = undefined;
      switch (element) {
        case 'next':
          newPage = String(Number(_this.props.currentPage) + 1);
          _this.props.onPagination(newPage, _this.props.pageSize);
          break;

        case 'input':
          var maxPage = _this.maxPage;
          newPage = ev.target.value;

          if (!newPage) {
            _this.setState({ currentPage: _this.props.currentPage });
            break;
          }

          if (Number(newPage) > maxPage) {
            newPage = String(maxPage);
          }

          if (Number(newPage) < 1) {
            newPage = "1";
          }

          _this.props.onPagination(newPage, _this.props.pageSize);
          break;

        case 'previous':
          newPage = String(Number(_this.props.currentPage) - 1);
          _this.props.onPagination(newPage, _this.props.pageSize);
          break;

        case 'size':
          var newPageSize = ev.target.value;
          if (!_this.props.pageSizeSelectionOptions.find(function (x) {
            return x.get('id') === newPageSize;
          })) {
            break;
          }
          // TODO: Clever current page correction
          _this.props.onPagination('1', newPageSize);
          break;
      }
    };
  }

  _createClass(Pager, [{
    key: 'componentWillReceiveProps',

    /**
     * Ensure the currentPage is defined by props
     *
     * @method componentWillReceiveProps
     * @param {Object} new props for component
     * @return {Void}
     */
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.currentPage !== this.state.currentPage) {
        this.setState({ currentPage: nextProps.currentPage });
      }
    }

    /**
     * Handle current page input internally until blur event
     *
     * @method handleCurrentPageInputChange
     * @return {Void}
     */
  }, {
    key: 'render',

    /**
     * Render method for page
     *
     * @method render
     * @return {JSX}
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'ui-pager' },
        _react2['default'].createElement(
          'div',
          { className: 'ui-pager__size' },
          this.sizeSelectionDropdown
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-pager__navigation' },
          this.previousArrow,
          _react2['default'].createElement(
            'span',
            { className: _utilsCss2['default'].unselectable },
            pageX()
          ),
          this.currentPageInput,
          _react2['default'].createElement(
            'span',
            { className: _utilsCss2['default'].unselectable },
            ofY(),
            this.maxPage
          ),
          this.nextArrow
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-pager__summary' },
          this.props.totalRecords,
          recordsText(this.props.totalRecords)
        )
      );
    }
  }, {
    key: 'maxPage',

    /**
     * Calculate the maximum page
     *
     * @method maxPage
     * @return {Integer}
     */
    get: function get() {
      if (this.props.pageSize && this.props.pageSize !== '0') {
        return Math.ceil(this.props.totalRecords / this.props.pageSize) || 1;
      }
      return 1;
    }

    /**
     * Should the previous arrow be disabled
     *
     * @method disablePrevious
     * @return {Boolean}
     */
  }, {
    key: 'disablePrevious',
    get: function get() {
      return this.props.currentPage === '1';
    }

    /**
     * Should the next arrow be disabled
     *
     * @method disableNext
     * @return {Boolean}
     */
  }, {
    key: 'disableNext',
    get: function get() {
      return this.props.currentPage * this.props.pageSize >= Number(this.props.totalRecords);
    }

    /**
     * Get previous arrow icon
     *
     * @method previousArrow
     * @return {JSX}
     */
  }, {
    key: 'previousArrow',
    get: function get() {
      var props = {
        type: 'dropdown',
        className: 'ui-pager__previous'
      };

      if (this.disablePrevious) {
        props.className += ' ui-pager__previous--disabled';
      } else {
        props.onClick = this.emitChangeCallback.bind(this, 'previous');
      }

      return _react2['default'].createElement(_icon2['default'], props);
    }

    /**
     * Get current page number input
     *
     * @method currentPageInput
     * @return {JSX}
     */
  }, {
    key: 'currentPageInput',
    get: function get() {
      var props = {
        value: this.state.currentPage,
        className: 'ui-pager__current-page',
        onChange: this.handleCurrentPageInputChange,
        onBlur: this.emitChangeCallback.bind(this, 'input'),
        onKeyUp: this.handleCurrentPageKeyUp
      };

      return _react2['default'].createElement(_number2['default'], props);
    }

    /**
     * Get next arrow icon
     *
     * @method nextArrow
     * @return {JSX}
     */
  }, {
    key: 'nextArrow',
    get: function get() {
      var props = {
        className: 'ui-pager__next',
        type: 'dropdown'
      };

      if (this.disableNext) {
        props.className += ' ui-pager__next--disabled';
      } else {
        props.onClick = this.emitChangeCallback.bind(this, 'next');
      }

      return _react2['default'].createElement(_icon2['default'], props);
    }

    /**
     * Page Size Selection Dropdown
     *
     * @method sizeSelectionDropdown
     * @return {JSX}
     */
  }, {
    key: 'sizeSelectionDropdown',
    get: function get() {
      if (this.props.showPageSizeSelection) {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'span',
            { className: _utilsCss2['default'].unselectable },
            showSizeText()
          ),
          _react2['default'].createElement(_dropdown2['default'], {
            options: this.props.pageSizeSelectionOptions,
            value: this.props.pageSize,
            onChange: this.emitChangeCallback.bind(this, 'size')
          }),
          _react2['default'].createElement(
            'span',
            { className: _utilsCss2['default'].unselectable },
            recordsText(this.props.pageSize)
          )
        );
      }
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Current visible page
       *
       * @property currentPage
       * @type {String}
       */
      currentPage: _react2['default'].PropTypes.string.isRequired,

      /**
       * Total number of records
       *
       * @property totalRecords
       * @type {String}
       */
      totalRecords: _react2['default'].PropTypes.string.isRequired,

      /**
       * Function called when any pager changes take place
       * PageSize, Current Page
       *
       * @property onPagination
       * @type {Function}
       */
      onPagination: _react2['default'].PropTypes.func.isRequired,

      /**
       * Pagination page size
       *
       * @property pageSize
       * @type {String}
       */
      pageSize: _react2['default'].PropTypes.string,

      /**
       * Should the page size selection dropdown be shown
       *
       * @property showPageSizeSelection
       * @type {Boolean}
       */
      showPageSizeSelection: _react2['default'].PropTypes.bool,

      /**
       * Set of page size options
       *
       * @property pageSizeSelectionOptions
       * @type {Object}
       */
      pageSizeSelectionOptions: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      pageSize: '10',
      showPageSizeSelection: false,
      pageSizeSelectionOptions: _immutable2['default'].fromJS([{ id: '10', name: 10 }, { id: '25', name: 25 }, { id: '50', name: 50 }])
    },
    enumerable: true
  }]);

  return Pager;
})(_react2['default'].Component);

function showSizeText() {
  return _i18nJs2['default'].t('pager.size', { defaultValue: 'Show ' });
}

function recordsText(numberOfRecords) {
  return _i18nJs2['default'].t('pager.records', { count: Number(numberOfRecords), defaultValue: ' records' });
}

function pageX() {
  return _i18nJs2['default'].t('pager.page_x', { defaultValue: 'Page ' });
}

function ofY() {
  return _i18nJs2['default'].t('pager.of_y', { defaultValue: ' of ' });
}

exports['default'] = Pager;
module.exports = exports['default'];

/**
 * Handle key up event in the page input
 *
 * @method handleCurrentPageKeyUp
 * @param {Event} key up event
 * @return {Void}
 */

/**
 * Emit change function depending on event
 *
 * @method emitChangeCallback
 * @param {String} element source of change
 * @param {Event} ev change event
 */