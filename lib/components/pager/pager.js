/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_css = require('./../../utils/css');

/*istanbul ignore next*/
var _css2 = _interopRequireDefault(_css);

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_number = require('./../number');

/*istanbul ignore next*/
var _number2 = _interopRequireDefault(_number);

var /*istanbul ignore next*/_dropdown = require('./../dropdown');

/*istanbul ignore next*/
var _dropdown2 = _interopRequireDefault(_dropdown);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_immutable = require('immutable');

/*istanbul ignore next*/
var _immutable2 = _interopRequireDefault(_immutable);

var /*istanbul ignore next*/_events = require('./../../utils/helpers/events');

/*istanbul ignore next*/
var _events2 = _interopRequireDefault(_events);

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
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Pager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Pager)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {

      /**
       * Current page is held in state so the
       * user can use the input field
       *
       * New props always overide the currentPage
       *
       * @property currentPage
       * @type {String}
       */
      currentPage: /*istanbul ignore next*/_this.props.currentPage
    }, _this.handleCurrentPageInputChange = function (ev) {
      /*istanbul ignore next*/_this.setState({ currentPage: ev.target.value });
    }, _this.handleCurrentPageKeyUp = function (ev) {
      if ( /*istanbul ignore next*/_events2.default.isEnterKey(ev)) {
        /*istanbul ignore next*/_this.emitChangeCallback('input', ev);
      }
    }, _this.emitChangeCallback = function (element, ev) {
      var newPage = /*istanbul ignore next*/void 0;
      /*istanbul ignore next*/
      (function () {
        switch (element) {
          case 'next':
            newPage = String(Number( /*istanbul ignore next*/_this.props.currentPage) + 1);
            /*istanbul ignore next*/_this.props.onPagination(newPage, /*istanbul ignore next*/_this.props.pageSize);
            break;

          case 'input':
            var maxPage = /*istanbul ignore next*/_this.maxPage;
            newPage = ev.target.value;

            if (!newPage) {
              /*istanbul ignore next*/_this.setState({ currentPage: /*istanbul ignore next*/_this.props.currentPage });
              break;
            }

            if (Number(newPage) > maxPage) {
              newPage = String(maxPage);
            }

            if (Number(newPage) < 1) {
              newPage = "1";
            }

            /*istanbul ignore next*/_this.props.onPagination(newPage, /*istanbul ignore next*/_this.props.pageSize);
            break;

          case 'previous':
            newPage = String(Number( /*istanbul ignore next*/_this.props.currentPage) - 1);
            /*istanbul ignore next*/_this.props.onPagination(newPage, /*istanbul ignore next*/_this.props.pageSize);
            break;

          case 'size':
            var newPageSize = ev.target.value;
            if (! /*istanbul ignore next*/_this.props.pageSizeSelectionOptions.find(function (x) /*istanbul ignore next*/{
              return x.get('id') === newPageSize;
            })) {
              break;
            }
            // TODO: Clever current page correction
            /*istanbul ignore next*/_this.props.onPagination('1', newPageSize);
            break;
        }
      })();
    }, _temp), _possibleConstructorReturn(_this, _ret);
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

  }, {
    key: 'render',


    /**
     * Render method for page
     *
     * @method render
     * @return {JSX}
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-pager' },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-pager__size' },
            this.sizeSelectionDropdown
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-pager__navigation' },
            this.previousArrow,
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'span',
              /*istanbul ignore next*/{ className: /*istanbul ignore next*/_css2.default.unselectable },
              pageX()
            ),
            this.currentPageInput,
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'span',
              /*istanbul ignore next*/{ className: /*istanbul ignore next*/_css2.default.unselectable },
              ofY(),
              this.maxPage
            ),
            this.nextArrow
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-pager__summary' },
            this.props.totalRecords,
            recordsText(this.props.totalRecords)
          )
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

      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, props)
      );
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

      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_number2.default, props)
      );
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

      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, props)
      );
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
        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/null,
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'span',
              /*istanbul ignore next*/{ className: /*istanbul ignore next*/_css2.default.unselectable },
              showSizeText()
            ),
            /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_dropdown2.default, /*istanbul ignore next*/{
              options: this.props.pageSizeSelectionOptions,
              value: this.props.pageSize,
              onChange: this.emitChangeCallback.bind(this, 'size')
            }),
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'span',
              /*istanbul ignore next*/{ className: /*istanbul ignore next*/_css2.default.unselectable },
              recordsText(this.props.pageSize)
            )
          )
        );
      }
    }
  }]);

  return Pager;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Pager.propTypes = {

  /**
   * Current visible page
   *
   * @property currentPage
   * @type {String}
   */
  currentPage: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * Total number of records
   *
   * @property totalRecords
   * @type {String}
   */
  totalRecords: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * Function called when any pager changes take place
   * PageSize, Current Page
   *
   * @property onPagination
   * @type {Function}
   */
  onPagination: /*istanbul ignore next*/_react2.default.PropTypes.func.isRequired,

  /**
   * Pagination page size
   *
   * @property pageSize
   * @type {String}
   */
  pageSize: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Should the page size selection dropdown be shown
   *
   * @property showPageSizeSelection
   * @type {Boolean}
   */
  showPageSizeSelection: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Set of page size options
   *
   * @property pageSizeSelectionOptions
   * @type {Object}
   */
  pageSizeSelectionOptions: /*istanbul ignore next*/_react2.default.PropTypes.object
};
/*istanbul ignore next*/Pager.defaultProps = {
  pageSize: '10',
  showPageSizeSelection: false,
  pageSizeSelectionOptions: /*istanbul ignore next*/_immutable2.default.fromJS([{ id: '10', name: 10 }, { id: '25', name: 25 }, { id: '50', name: 50 }])
};


function showSizeText() {
  return (/*istanbul ignore next*/_i18nJs2.default.t('pager.size', { defaultValue: 'Show ' })
  );
}

function recordsText(numberOfRecords) {
  return (/*istanbul ignore next*/_i18nJs2.default.t('pager.records', { count: Number(numberOfRecords), defaultValue: ' records' })
  );
}

function pageX() {
  return (/*istanbul ignore next*/_i18nJs2.default.t('pager.page_x', { defaultValue: 'Page ' })
  );
}

function ofY() {
  return (/*istanbul ignore next*/_i18nJs2.default.t('pager.of_y', { defaultValue: ' of ' })
  );
}

/*istanbul ignore next*/exports.default = Pager;