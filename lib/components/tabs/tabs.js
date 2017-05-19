'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Tabs = undefined;

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _tab = require('./tab');

var _tab2 = _interopRequireDefault(_tab);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Tabs: {
    displayName: 'Tabs'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/tabs/tabs.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
 * selectedTabId prop as shown in the example below.
 *
 * To render a Tabs Widget with Options:
 *
 *   <Tabs renderHiddenTabs={ false } selectedTabId='uniqueId2' >
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
var Tabs = _wrapComponent('Tabs')((_temp2 = _class = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this._window = window, _this.state = {

      /**
       * Tracks the validity of each tab
       *
       * @property tabValidity
       * @type {Object}
       */
      tabValidity: _immutable2.default.Map(),

      /**
       * Tracks the warning of each tab
       *
       * @property tabWarning
       * @type {Object}
       */
      tabWarning: _immutable2.default.Map()
    }, _this.changeValidity = function (id, valid) {
      _this.setState({ tabValidity: _this.state.tabValidity.set(id, valid) });
    }, _this.changeWarning = function (id, warning) {
      _this.setState({ tabWarning: _this.state.tabWarning.set(id, warning) });
    }, _this.handleTabClick = function (ev) {
      if (_events2.default.isEnterKey(ev) || !_events2.default.isEventType(ev, 'keydown')) {
        var tabid = ev.target.dataset.tabid;
        _this.updateVisibleTab(tabid);
      }
    }, _this.tabsHeaderClasses = function () {
      return (0, _classnames2.default)('carbon-tabs__headers', 'carbon-tabs__headers--align-' + _this.props.align, 'carbon-tabs__headers');
    }, _this.tabHeaderClasses = function (tab) {
      var tabHasError = _this.state.tabValidity.get(tab.props.tabId) == false,
          tabHasWarning = _this.state.tabWarning.get(tab.props.tabId) == true && !tabHasError;

      return (0, _classnames2.default)('carbon-tabs__headers__header', tab.props.headerClassName, {
        'carbon-tabs__headers__header--error': tabHasError,
        'carbon-tabs__headers__header--warning': tabHasWarning,
        'carbon-tabs__headers__header--selected': tab.props.tabId === _this.state.selectedTabId
      });
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
          changeValidity: this.changeValidity,
          changeWarning: this.changeWarning
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
      var selectedTabId = void 0;
      if (this.props.selectedTabId) {
        selectedTabId = this.props.selectedTabId;
      } else {
        var hash = this._window.location.hash.substring(1);

        if (Array.isArray(this.props.children)) {
          var children = (0, _lodash.compact)(this.props.children),
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

          selectedTabId = useHash ? hash : children[0].props.tabId;
        } else {
          selectedTabId = this.props.children.props.tabId;
        }
      }
      this.setState({ selectedTabId: selectedTabId });
    }

    /**
    * A lifecycle method that is called when props are updated.
    * Used here to change the visible tab when selectedTabId is updated.
    *
    * @method  componentWillReceiveProps
    * @param {object} nextProps
    */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.selectedTabId !== nextProps.selectedTabId && nextProps.selectedTabId !== this.state.selectedTabId) {
        this.updateVisibleTab(nextProps.selectedTabId);
      }
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
     * Sets the warning state of the given tab (id)
     *
     * @method changeWarning
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
    key: 'updateVisibleTab',
    value: function updateVisibleTab(tabid) {
      var url = '' + this._window.location.origin + this._window.location.pathname + '#' + tabid;
      this._window.history.replaceState(null, 'change-tab', url);

      this.setState({ selectedTabId: tabid });

      if (this.props.onTabChange) {
        this.props.onTabChange(tabid);
      }
    }

    /**
     * Classes to be applied to the whole tabs component
     *
     * @method mainClasses Main Class getter
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags.tagComponent)('tabs', this.props)),
        this.tabHeaders,
        this.tabs
      );
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-tabs', 'carbon-tabs__position-' + this.props.position, this.props.className);
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
      var _this2 = this;

      var tabTitles = (0, _lodash.compact)(_react3.default.Children.toArray(this.props.children)).map(function (child) {
        return _react3.default.createElement(
          'li',
          {
            className: _this2.tabHeaderClasses(child),
            'data-element': 'select-tab',
            'data-tabid': child.props.tabId,
            key: child.props.tabId,
            onClick: _this2.handleTabClick,
            onKeyDown: _this2.handleTabClick,
            ref: child.props.tabId + '-tab',
            tabIndex: '0'
          },
          child.props.title
        );
      });

      return _react3.default.createElement(
        'ul',
        { className: this.tabsHeaderClasses() },
        tabTitles
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
      var _this3 = this;

      var visibleTab = void 0;

      (0, _lodash.compact)(_react3.default.Children.toArray(this.props.children)).map(function (child) {
        if (child.props.tabId == _this3.state.selectedTabId) {
          visibleTab = child;
        }
      });

      return _react3.default.cloneElement(visibleTab, { className: 'carbon-tab--selected' });
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
      var _this4 = this;

      if (!this.props.renderHiddenTabs) {
        return this.visibleTab;
      }

      var tabs = (0, _lodash.compact)(_react3.default.Children.toArray(this.props.children)).map(function (child) {

        var klass = 'hidden';

        if (child.props.tabId === _this4.state.selectedTabId) {
          klass = 'carbon-tab--selected';
        }

        return _react3.default.cloneElement(child, { className: klass });
      });

      return tabs;
    }
  }]);

  return Tabs;
}(_react3.default.Component), _class.propTypes = {

  /**
   * Should the unfocussed tabs be rendered to the page
   *
   * @property renderHiddenTabs
   * @type {Boolean}
   * @default true
   */
  renderHiddenTabs: _propTypes2.default.bool,

  /**
   * The tab to be displayed updating this prop will change the visible tab.
   * Defaults to the first tab upon initial load.
   *
   * @property selectedTabId
   * @type {String}
   * @default firstTab
   */
  selectedTabId: _propTypes2.default.string,

  /**
   * Individual tabs
   *
   * @property children
   * @type {Object | Array}
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,

  /**
   * Aligns the tab headers
   *
   * @property align
   * @type {String}
   */
  align: _propTypes2.default.string,

  /**
   * Emitted when the visible tab is changed
   *
   * @property onTabChange
   * @type {Func}
   */
  onTabChange: _propTypes2.default.func,

  /**
   * The position of tabs with respect to the content (top (default) or left)
   *
   * @property position
   * @type {String}
   */
  position: _propTypes2.default.string
}, _class.defaultProps = {
  renderHiddenTabs: true,
  align: 'left',
  position: 'top'
}, _class.childContextTypes = {

  /**
   * Defines a context object for tab of the tabs component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property tab
   * @type {Object}
   */
  tabs: _propTypes2.default.object
}, _temp2));

exports.Tabs = Tabs;
exports.Tab = _tab2.default;