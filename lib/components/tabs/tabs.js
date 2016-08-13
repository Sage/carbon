/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Tabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_immutable = require('immutable');

/*istanbul ignore next*/
var _immutable2 = _interopRequireDefault(_immutable);

var /*istanbul ignore next*/_tab = require('./tab');

/*istanbul ignore next*/
var _tab2 = _interopRequireDefault(_tab);

var /*istanbul ignore next*/_lodash = require('lodash');

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Tabs widget.
 *
 * == How to use a Tabs Widget in a component:
 *
 * In your file
 *
 *   import { Tabs, Tab } from 'components/tabs';
 *
 * To render a Tabs Widget:
 *
 *   <Tabs>
 *     <Tab title='Title 1' tabId='uniqueId1'>
 *
 *       <Textbox />
 *       <Textbox />
 *
 *     </Tab>
 *
 *     <Tab title='Title 2' tabId='uniqueId2'>
 *
 *       <Date />
 *       <Textbox />
 *
 *     </Tab>
 *   </Tabs>
 *
 * Optionally, you can pass `renderHiddenTabs` prop to the Tabs. By default this is
 * set to true and therefore all tabs will be rendered. The selected tab will have
 * a class of `selected` and all other tabs will have a class of `hidden` which sets
 * their display to `none`.
 *
 * Setting `renderHiddenTabs to false will add a small performance improvement as
 * all previously hidden tabs will not be rendered to the page.
 *
 * If you are using the tab component within a form all tabs should be rendered so that
 * form validation can work correctly.
 *
 * The tabs widget also allows you to select a tab on page load. By default this is set
 * to the first tab. To set a different tab on page load pass a tabId to the
 * initialSelectedTabId prop as shown in the example below.
 *
 * To render a Tabs Widget with Options:
 *
 *   <Tabs renderHiddenTabs={ false } initialSelectedTabId='uniqueId2' >
 *     <Tab title='Title 1' tabId='uniqueId1'>
 *
 *       <Textbox />
 *       <Textbox />
 *
 *     </Tab>
 *
 *     <Tab title='Title 2' tabId='uniqueId2'>
 *
 *       <Date />
 *       <Textbox />
 *
 *     </Tab>
 *   </Tabs>
 *
 * @class Tabs
 * @constructor
 */

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tabs)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._window = window, _this.state = {

      /**
       * Tracks the validity of each tab
       *
       * @property tabValidity
       * @type {Object}
       */
      tabValidity: /*istanbul ignore next*/_immutable2.default.Map()
    }, _this.changeValidity = function (id, valid) {
      /*istanbul ignore next*/_this.setState({ tabValidity: /*istanbul ignore next*/_this.state.tabValidity.set(id, valid) });
    }, _this.handleTabClick = function (ev) {
      var tabid = ev.target.dataset.tabid;
      /*istanbul ignore next*/_this._window.location = /*istanbul ignore next*/'#' + tabid;
      /*istanbul ignore next*/_this.setState({ selectedTabId: tabid });

      if ( /*istanbul ignore next*/_this.props.onTabClick) {
        /*istanbul ignore next*/_this.props.onTabClick(tabid);
      }
    }, _this.tabHeaderClasses = function (tab) {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-tabs__headers__header', tab.props.headerClassName, {
          'ui-tabs__headers__header--error': /*istanbul ignore next*/_this.state.tabValidity.get(tab.props.tabId) == false,
          'ui-tabs__headers__header--selected': tab.props.tabId === /*istanbul ignore next*/_this.state.selectedTabId
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Store the window object as property.
   *
   * @property _window
   * @type {Object}
   */


  _createClass(Tabs, [{
    key: 'getChildContext',


    /**
     * Returns tabs object to tab component.
     *
     * @method getChildContext
     */
    value: function getChildContext() {
      return {
        tabs: {
          changeValidity: this.changeValidity
        }
      };
    }
  }, {
    key: 'componentWillMount',


    /**
     * A lifecycle method that is called after before initial render.
     * Can set up state of component without causing a re-render
     *
     * @method componentWillMount
     */
    value: function componentWillMount() {
      var initialSelectedTabId = /*istanbul ignore next*/void 0;

      if (this.props.initialSelectedTabId) {
        initialSelectedTabId = this.props.initialSelectedTabId;
      } else {
        var hash = this._window.location.hash.substring(1);

        if (Array.isArray(this.props.children)) {
          var children = /*istanbul ignore next*/(0, _lodash.compact)(this.props.children),
              useHash = false;

          if (hash) {
            for (var index in children) {
              var child = children[index];

              if (child.props.tabId == hash) {
                useHash = true;
                break;
              }
            }
          }

          initialSelectedTabId = useHash ? hash : children[0].props.tabId;
        } else {
          initialSelectedTabId = this.props.children.props.tabId;
        }
      }

      this.setState({ selectedTabId: initialSelectedTabId });
    }

    /**
     * Sets the validity state of the given tab (id) to the
     * given state (valid)
     *
     * @method changeValidity
     * @param {Number} id tab identifier
     * @param {Boolean} state of tab child
     */


    /**
     * Handles the changing of tabs
     *
     * @method handleTabClick
     * @param {Event} ev Click Event
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          this.tabHeaders,
          this.tabs
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Classes to be applied to the whole tabs component
     *
     * @method mainClasses Main Class getter
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-tabs', this.props.className)
      );
    }
  }, {
    key: 'tabHeaders',


    /**
     * Build the headers for the tab component
     *
     * @method tabHeaders
     * @return Unordered list of tab titles
     */
    get: function get() {
      /*istanbul ignore next*/
      var _this2 = this;

      var tabTitles = /*istanbul ignore next*/(0, _lodash.compact)( /*istanbul ignore next*/_react2.default.Children.toArray(this.props.children)).map(function (child) {
        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'li',
            /*istanbul ignore next*/{
              className: /*istanbul ignore next*/_this2.tabHeaderClasses(child),
              onClick: /*istanbul ignore next*/_this2.handleTabClick,
              key: child.props.tabId,
              ref: /*istanbul ignore next*/child.props.tabId + '-tab',
              /*istanbul ignore next*/'data-tabid': child.props.tabId },
            child.props.title
          )
        );
      });

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'ul',
          /*istanbul ignore next*/{ className: /*istanbul ignore next*/'ui-tabs__headers ui-tabs__headers--align-' + this.props.align },
          tabTitles
        )
      );
    }

    /**
     * Builds the single currently selected tab
     *
     * @method visibleTab
     * @return {JSX} visible tab
     */

  }, {
    key: 'visibleTab',
    get: function get() {
      /*istanbul ignore next*/
      var _this3 = this;

      var visibleTab = /*istanbul ignore next*/void 0;

      /*istanbul ignore next*/(0, _lodash.compact)( /*istanbul ignore next*/_react2.default.Children.toArray(this.props.children)).map(function (child) {
        if (child.props.tabId == /*istanbul ignore next*/_this3.state.selectedTabId) {
          visibleTab = child;
        }
      });

      return (/*istanbul ignore next*/_react2.default.cloneElement(visibleTab, { className: 'ui-tab--selected' })
      );
    }

    /**
     * Builds all tabs where non selected tabs have class of hidden
     *
     * @method tabs
     * @return {JSX} all tabs
     */

  }, {
    key: 'tabs',
    get: function get() {
      /*istanbul ignore next*/
      var _this4 = this;

      if (!this.props.renderHiddenTabs) {
        return this.visibleTab;
      }

      var tabs = /*istanbul ignore next*/(0, _lodash.compact)( /*istanbul ignore next*/_react2.default.Children.toArray(this.props.children)).map(function (child) {

        var klass = 'hidden';

        if (child.props.tabId === /*istanbul ignore next*/_this4.state.selectedTabId) {
          klass = 'ui-tab--selected';
        }

        return (/*istanbul ignore next*/_react2.default.cloneElement(child, { className: klass })
        );
      });

      return tabs;
    }
  }]);

  return Tabs;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Tabs.propTypes = {

  /**
   * Should the unfocussed tabs be rendered to the page
   *
   * @property renderHiddenTabs
   * @type {Boolean}
   * @default true
   */
  renderHiddenTabs: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * The selected tab on page load
   * Defaults to the first tab
   *
   * @property initialSelectedTabId
   * @type {String}
   * @default firstTab
   */
  initialSelectedTabId: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Individual tabs
   *
   * @property children
   * @type {Object | Array}
   */
  children: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.array, /*istanbul ignore next*/_react2.default.PropTypes.object]).isRequired,

  /**
   * Aligns the tab headers
   *
   * @property align
   * @type {String}
   */
  align: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Emitted when a tab header is clicked
   *
   * @property onTabClick
   * @type {Func}
   */
  onTabClick: /*istanbul ignore next*/_react2.default.PropTypes.func
};
/*istanbul ignore next*/Tabs.defaultProps = {
  renderHiddenTabs: true,
  align: 'left'
};
/*istanbul ignore next*/Tabs.childContextTypes = {

  /**
   * Defines a context object for tab of the tabs component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property tab
   * @type {Object}
   */
  tabs: /*istanbul ignore next*/_react2.default.PropTypes.object
};
/*istanbul ignore next*/exports.Tabs = Tabs;
/*istanbul ignore next*/exports.Tab = _tab2.default;