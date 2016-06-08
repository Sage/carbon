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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _tab = require('./tab');

var _tab2 = _interopRequireDefault(_tab);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var Tabs = (function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    var _this = this;

    _classCallCheck(this, Tabs);

    _get(Object.getPrototypeOf(Tabs.prototype), 'constructor', this).apply(this, arguments);

    this._window = window;
    this.state = {

      /**
       * Tracks the validity of each tab
       *
       * @property tabValidity
       * @type {Object}
       */
      tabValidity: _immutable2['default'].Map()
    };

    this.changeValidity = function (id, valid) {
      _this.setState({ tabValidity: _this.state.tabValidity.set(id, valid) });
    };

    this.handleTabClick = function (ev) {
      var tabid = ev.target.dataset.tabid;
      _this._window.location = '#' + tabid;
      _this.setState({ selectedTabId: tabid });

      if (_this.props.onTabClick) {
        _this.props.onTabClick(tabid);
      }
    };

    this.tabHeaderClasses = function (tab) {
      return (0, _classnames2['default'])('ui-tabs__headers__header', tab.props.headerClassName, {
        'ui-tabs__headers__header--error': _this.state.tabValidity.get(tab.props.tabId) == false,
        'ui-tabs__headers__header--selected': tab.props.tabId === _this.state.selectedTabId
      });
    };
  }

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
      var initialSelectedTabId = undefined;

      if (this.props.initialSelectedTabId) {
        initialSelectedTabId = this.props.initialSelectedTabId;
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
  }, {
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        this.tabHeaders,
        this.tabs
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
      return (0, _classnames2['default'])('ui-tabs', this.props.className);
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

      var tabTitles = (0, _lodash.compact)(_react2['default'].Children.toArray(this.props.children)).map(function (child) {
        return _react2['default'].createElement(
          'li',
          {
            className: _this2.tabHeaderClasses(child),
            onClick: _this2.handleTabClick,
            key: child.props.tabId,
            'data-tabid': child.props.tabId },
          child.props.title
        );
      });

      return _react2['default'].createElement(
        'ul',
        { className: 'ui-tabs__headers ui-tabs__headers--align-' + this.props.align },
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

      var visibleTab = undefined;

      (0, _lodash.compact)(_react2['default'].Children.toArray(this.props.children)).map(function (child) {
        if (child.props.tabId == _this3.state.selectedTabId) {
          visibleTab = child;
        }
      });

      return _react2['default'].cloneElement(visibleTab, { className: 'ui-tab--selected' });
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

      var tabs = (0, _lodash.compact)(_react2['default'].Children.toArray(this.props.children)).map(function (child) {

        var klass = 'hidden';

        if (child.props.tabId === _this4.state.selectedTabId) {
          klass = 'ui-tab--selected';
        }

        return _react2['default'].cloneElement(child, { className: klass });
      });

      return tabs;
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Should the unfocussed tabs be rendered to the page
       *
       * @property renderHiddenTabs
       * @type {Boolean}
       * @default true
       */
      renderHiddenTabs: _react2['default'].PropTypes.bool,

      /**
       * The selected tab on page load
       * Defaults to the first tab
       *
       * @property initialSelectedTabId
       * @type {String}
       * @default firstTab
       */
      initialSelectedTabId: _react2['default'].PropTypes.string,

      /**
       * Individual tabs
       *
       * @property children
       * @type {Object | Array}
       */
      children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired,

      /**
       * Aligns the tab headers
       *
       * @property align
       * @type {String}
       */
      align: _react2['default'].PropTypes.string,

      /**
       * Emitted when a tab header is clicked
       *
       * @property onTabClick
       * @type {Func}
       */
      onTabClick: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      renderHiddenTabs: true,
      align: 'left'
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {

      /**
       * Defines a context object for tab of the tabs component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property tab
       * @type {Object}
       */
      tabs: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  return Tabs;
})(_react2['default'].Component);

exports.Tabs = Tabs;
exports.Tab = _tab2['default'];

/**
 * Store the window object as property.
 *
 * @property _window
 * @type {Object}
 */

/**
 * Handles the changing of tabs
 *
 * @method handleTabClick
 * @param {Event} ev Click Event
 */