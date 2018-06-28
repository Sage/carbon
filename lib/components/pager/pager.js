'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _css = require('./../../utils/css');

var _css2 = _interopRequireDefault(_css);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _number = require('./../number');

var _number2 = _interopRequireDefault(_number);

var _dropdown = require('./../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Pager = function (_React$Component) {
  _inherits(Pager, _React$Component);

  function Pager() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pager.__proto__ || Object.getPrototypeOf(Pager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {

      /**
       * Current page is held in state so the
       * user can use the input field
       *
       * New props always overide the currentPage
       *
       * @property currentPage
       * @type {String}
       */
      currentPage: _this.props.currentPage

      /**
       * Ensure the currentPage is defined by props
       *
       * @method componentWillReceiveProps
       * @param {Object} new props for component
       * @return {Void}
       */
    }, _this.handleCurrentPageInputChange = function (ev) {
      _this.setState({ currentPage: ev.target.value });
    }, _this.handleCurrentPageKeyUp = function (ev) {
      if (_events2.default.isEnterKey(ev)) {
        _this.emitChangeCallback('input', ev);
      }
    }, _this.emitChangeCallback = function (element, ev) {
      var newPage = void 0,
          newPageSize = void 0;
      switch (element) {
        case 'next':
          newPage = String(Number(_this.props.currentPage) + 1);
          _this.props.onPagination(newPage, _this.props.pageSize, element);
          break;

        case 'input':
          newPage = Math.abs(Number(ev.target.value));

          if (Number.isNaN(newPage)) {
            newPage = '1';
          }

          if (!newPage) {
            _this.setState({ currentPage: _this.props.currentPage });
            break;
          }

          if (newPage > _this.maxPage) {
            newPage = String(_this.maxPage);
          }

          _this.props.onPagination(String(newPage), _this.props.pageSize, element);
          break;

        case 'previous':
          newPage = String(Number(_this.props.currentPage) - 1);
          _this.props.onPagination(newPage, _this.props.pageSize, element);
          break;

        case 'size':
          newPageSize = ev.target.value;
          if (!_this.props.pageSizeSelectionOptions.find(function (x) {
            return x.get('id') === newPageSize;
          })) {
            break;
          }
          // TODO: Clever current page correction
          _this.props.onPagination('1', newPageSize, element);
          break;
        default:
          break;
      }
    }, _this.emitCallbackSelector = function (element) {
      return function (ev) {
        _this.emitChangeCallback(element, ev);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pager, [{
    key: 'componentWillReceiveProps',
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


    /**
     * Return callback binding the element to target
     * TODO: Refactor to move or change the switch statement to functions
     *
     * @method emitCallbackSelector
     * @return {Function}
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
      return _react2.default.createElement(
        'div',
        _extends({ className: 'carbon-pager' }, (0, _tags2.default)('pager', this.props)),
        _react2.default.createElement(
          'div',
          { className: 'carbon-pager__size' },
          this.sizeSelectionDropdown
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-pager__navigation' },
          this.previousArrow,
          _react2.default.createElement(
            'span',
            { className: _css2.default.unselectable },
            pageX()
          ),
          this.currentPageInput,
          _react2.default.createElement(
            'span',
            { className: _css2.default.unselectable },
            ofY(),
            this.maxPage
          ),
          this.nextArrow
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-pager__summary' },
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
        className: 'carbon-pager__previous',
        'data-element': 'previous-page'
      };

      if (this.disablePrevious) {
        props.className += ' carbon-pager__previous--disabled';
      } else {
        props.onClick = this.emitCallbackSelector('previous');
      }

      return _react2.default.createElement(_icon2.default, props);
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
        className: 'carbon-pager__current-page',
        'data-element': 'current-page',
        onChange: this.handleCurrentPageInputChange,
        onBlur: this.emitCallbackSelector('input'),
        onKeyUp: this.handleCurrentPageKeyUp
      };

      return _react2.default.createElement(_number2.default, props);
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
        className: 'carbon-pager__next',
        'data-element': 'next-page',
        type: 'dropdown'
      };

      if (this.disableNext) {
        props.className += ' carbon-pager__next--disabled';
      } else {
        props.onClick = this.emitCallbackSelector('next');
      }

      return _react2.default.createElement(_icon2.default, props);
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
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: _css2.default.unselectable },
            showSizeText()
          ),
          _react2.default.createElement(_dropdown2.default, {
            options: this.props.pageSizeSelectionOptions,
            value: this.props.pageSize,
            onChange: this.emitCallbackSelector('size'),
            'data-element': 'page-select'
          }),
          _react2.default.createElement(
            'span',
            { className: _css2.default.unselectable },
            recordsText(this.props.pageSize)
          )
        );
      }
      return null;
    }
  }]);

  return Pager;
}(_react2.default.Component);

Pager.propTypes = {

  /**
   * Current visible page
   *
   * @property currentPage
   * @type {String}
   */
  currentPage: _propTypes2.default.string.isRequired,

  /**
   * Total number of records
   *
   * @property totalRecords
   * @type {String}
   */
  totalRecords: _propTypes2.default.string.isRequired,

  /**
   * Function called when any pager changes take place
   * PageSize, Current Page
   *
   * @property onPagination
   * @type {Function}
   */
  onPagination: _propTypes2.default.func.isRequired,

  /**
   * Pagination page size
   *
   * @property pageSize
   * @type {String}
   */
  pageSize: _propTypes2.default.string,

  /**
   * Should the page size selection dropdown be shown
   *
   * @property showPageSizeSelection
   * @type {Boolean}
   */
  showPageSizeSelection: _propTypes2.default.bool,

  /**
   * Set of page size options
   *
   * @property pageSizeSelectionOptions
   * @type {Object}
   */
  pageSizeSelectionOptions: _propTypes2.default.object
};
Pager.defaultProps = {
  pageSize: '10',
  showPageSizeSelection: false,
  pageSizeSelectionOptions: _immutable2.default.fromJS([{ id: '10', name: 10 }, { id: '25', name: 25 }, { id: '50', name: 50 }])
};


function showSizeText() {
  return _i18nJs2.default.t('pager.size', { defaultValue: 'Show ' });
}

function recordsText(numberOfRecords) {
  return _i18nJs2.default.t('pager.records', { count: Number(numberOfRecords), defaultValue: ' records' });
}

function pageX() {
  return _i18nJs2.default.t('pager.page_x', { defaultValue: 'Page ' });
}

function ofY() {
  return _i18nJs2.default.t('pager.of_y', { defaultValue: ' of ' });
}

exports.default = Pager;