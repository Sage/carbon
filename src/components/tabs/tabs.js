import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { compact } from 'lodash';
import classNames from 'classnames';
import Tab from './tab/tab.component';
import Event from '../../utils/helpers/events';
import tagComponent from '../../utils/helpers/tags';
import Browser from '../../utils/helpers/browser';
import './tabs.scss';

class Tabs extends React.Component {
  static propTypes = {
    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * Should the unfocussed tabs be rendered to the page
     */
    renderHiddenTabs: PropTypes.bool,

    /**
     * The tab to be displayed updating this prop will change the visible tab.
     * Defaults to the first tab upon initial load.
     */
    selectedTabId: PropTypes.string,

    /**
     * Individual tabs
     */
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,

    /**
     * Aligns the tab headers
     */
    align: PropTypes.string,

    /**
     * Emitted when the visible tab is changed
     */
    onTabChange: PropTypes.func,

    /**
     * The position of tabs with respect to the content (top (default) or left)
     */
    position: PropTypes.string
  };

  static defaultProps = {
    renderHiddenTabs: true,
    align: 'left',
    position: 'top'
  };

  static childContextTypes = {
    /**
     * Defines a context object for tab of the tabs component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property tab
     * @type {Object}
     */
    tabs: PropTypes.object
  };

  state = {
    /**
     * Tracks the validity of each tab
     *
     * @property tabValidity
     * @type {Object}
     */
    tabValidity: Immutable.Map(),

    /**
     * Tracks the warning of each tab
     *
     * @property tabWarning
     * @type {Object}
     */
    tabWarning: Immutable.Map()
  };

  /**
   * Returns tabs object to tab component.
   *
   * @method getChildContext
   */
  getChildContext() {
    return {
      tabs: {
        changeValidity: this.changeValidity,
        changeWarning: this.changeWarning
      }
    };
  }

  /**
   * A lifecycle method that is called after before initial render.
   * Can set up state of component without causing a re-render
   *
   * @method componentWillMount
   */
  componentWillMount() {
    let selectedTabId;
    if (this.props.selectedTabId) {
      selectedTabId = this.props.selectedTabId;
    } else {
      const hash = this._window.location.hash.substring(1);

      if (Array.isArray(this.props.children)) {
        const children = compact(this.props.children);
        let useHash = false;

        if (hash) {
          for (const index in children) {
            const child = children[index];

            if (child.props.tabId === hash) {
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
    this.setState({ selectedTabId });
  }

  /**
   * A lifecycle method that is called when props are updated.
   * Used here to change the visible tab when selectedTabId is updated.
   *
   * @method  componentWillReceiveProps
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTabId !== nextProps.selectedTabId && nextProps.selectedTabId !== this.state.selectedTabId) {
      this.updateVisibleTab(nextProps.selectedTabId);
    }
  }

  /**
   * Store the window object as property.
   *
   * @property _window
   * @type {Object}
   */
  _window = Browser.getWindow();

  /**
   * Sets the validity state of the given tab (id) to the
   * given state (valid)
   *
   * @method changeValidity
   * @param {Number} id tab identifier
   * @param {Boolean} state of tab child
   */
  changeValidity = (id, valid) => {
    this.setState(prevState => ({ tabValidity: prevState.tabValidity.set(id, valid) }));
  };

  /**
   * Sets the warning state of the given tab (id)
   *
   * @method changeWarning
   * @param {Number} id tab identifier
   * @param {Boolean} state of tab child
   */
  changeWarning = (id, warning) => {
    this.setState(prevState => ({ tabWarning: prevState.tabWarning.set(id, warning) }));
  };

  /**
   * Handles the changing of tabs with the mouse
   *
   * @method handleTabClick
   * @param {Event} ev Click Event
   */
  handleTabClick = (ev) => {
    if (Event.isEventType(ev, 'keydown')) {
      return;
    }
    const { tabid } = ev.target.dataset;
    this.updateVisibleTab(tabid);
  };

  /**
   * Handles the keyboard navigation of tabs
   *
   * @method handleKeyDown
   * @param {Number} index Index of the tab
   */
  handleKeyDown = (index) => {
    return (event) => {
      const isVertical = this.isVertical(this.props.position);
      const isUp = isVertical && Event.isUpKey(event);
      const isDown = isVertical && Event.isDownKey(event);
      const isLeft = !isVertical && Event.isLeftKey(event);
      const isRight = !isVertical && Event.isRightKey(event);

      if (isUp || isLeft) {
        this.goToTab(event, index - 1);
      } else if (isDown || isRight) {
        this.goToTab(event, index + 1);
      }
    };
  };

  /**
   * Will trigger the tab at the given index.
   *
   * @method goToTab
   * @param {Integer}
   * @return {Void}
   */
  goToTab(event, index) {
    event.preventDefault();
    let newIndex = index;

    if (index < 0) {
      newIndex = this.tabIds.length - 1;
    } else if (index === this.tabIds.length) {
      newIndex = 0;
    }

    const nextTabId = this.tabIds[newIndex];
    const nextRef = this.tabRefs[newIndex];
    this.updateVisibleTab(nextTabId);
    this.focusTab(this[nextRef]);
  }

  /**
   * Updates the currently visible tab
   *
   * @method updateVisibleTab
   * @param {Number} tabid The id of the tab
   */
  updateVisibleTab(tabid) {
    const url = `${this._window.location.origin}${this._window.location.pathname}#${tabid}`;
    this._window.history.replaceState(null, 'change-tab', url);

    this.setState({ selectedTabId: tabid });

    if (this.props.onTabChange) {
      this.props.onTabChange(tabid);
    }
  }

  /**
   * Focuses the tab for the reference specified
   *
   * @method focusTab
   * @param {Object}
   */
  focusTab(ref) {
    const domNode = ReactDOM.findDOMNode(ref); // eslint-disable-line react/no-find-dom-node
    domNode.focus();
  }

  /**
   * Classes to be applied to the whole tabs component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return classNames('carbon-tabs', `carbon-tabs__position-${this.props.position}`, this.props.className);
  }

  /**
   * Generates the HTML classes for the tabs header.
   *
   * @method tabHeaderClasses
   * @return {String}
   */
  tabsHeaderClasses = () => {
    return classNames(
      'carbon-tabs__headers',
      `carbon-tabs__headers--align-${this.props.align}`,
      'carbon-tabs__headers'
    );
  };

  /**
   * Generates the HTML classes for the given tab.
   *
   * @method tabHeaderClasses
   * @param {Node}
   * @return {String}
   */
  tabHeaderClasses = (tab) => {
    const tabHasError = this.state.tabValidity.get(tab.props.tabId) === false,
        tabHasWarning = this.state.tabWarning.get(tab.props.tabId) === true && !tabHasError;

    return classNames('carbon-tabs__headers__header', tab.props.headerClassName, {
      'carbon-tabs__headers__header--error': tabHasError,
      'carbon-tabs__headers__header--warning': tabHasWarning,
      'carbon-tabs__headers__header--selected': this.isTabSelected(tab.props.tabId)
    });
  };

  /**
   * Returns true/false for if the given tab id is selected.
   *
   * @method isTabSelected
   * @param {String}
   * @return {Boolean}
   */
  isTabSelected = tabId => tabId === this.state.selectedTabId;

  /**
   * The children nodes converted into an Array
   *
   * @method children
   * @return {Array} Ordered array of children
   */
  get children() {
    return compact(React.Children.toArray(this.props.children));
  }

  /**
   * Array of the tabIds for the child nodes
   *
   * @method tabIds
   * @return {Array} Ordered array of tabIds for the child nodes
   */
  get tabIds() {
    return this.children.map(child => child.props.tabId);
  }

  /**
   * Build the headers for the tab component
   *
   * @method tabHeaders
   * @return Unordered list of tab titles
   */
  get tabHeaders() {
    this.tabRefs = [];
    const tabTitles = this.children.map((child, index) => {
      const ref = `${child.props.tabId}-tab`;
      this.tabRefs.push(ref);
      return (
        <li
          aria-selected={ this.isTabSelected(child.props.tabId) }
          className={ this.tabHeaderClasses(child) }
          data-element='select-tab'
          data-tabid={ child.props.tabId }
          id={ ref }
          key={ child.props.tabId }
          onClick={ this.handleTabClick }
          onKeyDown={ this.handleKeyDown(index) }
          ref={ (node) => {
            this[ref] = node;
          } }
          role='tab'
          tabIndex={ this.isTabSelected(child.props.tabId) ? '0' : '-1' }
        >
          {child.props.title}
        </li>
      );
    });

    return (
      <ul className={ this.tabsHeaderClasses() } role='tablist'>
        {tabTitles}
      </ul>
    );
  }

  /**
   * Builds the single currently selected tab
   *
   * @method visibleTab
   * @return {JSX} visible tab
   */
  get visibleTab() {
    let visibleTab;

    this.children.forEach((child) => {
      if (this.isTabSelected(child.props.tabId)) {
        visibleTab = child;
      }
    });

    return React.cloneElement(visibleTab, { className: 'carbon-tab--selected' });
  }

  /**
   * Builds all tabs where non selected tabs have class of hidden
   *
   * @method tabs
   * @return {JSX} all tabs
   */
  get tabs() {
    if (!this.props.renderHiddenTabs) {
      return this.visibleTab;
    }

    const tabs = this.children.map((child, index) => {
      let klass = 'hidden';

      if (this.isTabSelected(child.props.tabId)) {
        klass = 'carbon-tab--selected';
      }

      const props = {
        ariaLabelledby: this.tabRefs[index],
        className: klass,
        role: 'tabPanel'
      };

      return React.cloneElement(child, props);
    });

    return tabs;
  }

  /**
   * Determines if the tab titles are in a vertical format.
   *
   * @method isVertical
   * @param {String} position
   * @return {Boolean}
   */
  isVertical(position) {
    return position === 'left';
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('tabs', this.props) }>
        {this.tabHeaders}
        {this.tabs}
      </div>
    );
  }
}

export { Tabs, Tab };
