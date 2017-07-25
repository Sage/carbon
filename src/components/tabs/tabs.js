import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { compact } from 'lodash';
import classNames from 'classnames';
import Tab from './tab';
import Event from './../../utils/helpers/events';
import tagComponent from '../../utils/helpers/tags';

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
class Tabs extends React.Component {
  static propTypes = {
    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Should the unfocussed tabs be rendered to the page
     *
     * @property renderHiddenTabs
     * @type {Boolean}
     * @default true
     */
    renderHiddenTabs: PropTypes.bool,

    /**
     * The tab to be displayed updating this prop will change the visible tab.
     * Defaults to the first tab upon initial load.
     *
     * @property selectedTabId
     * @type {String}
     * @default firstTab
     */
    selectedTabId: PropTypes.string,

    /**
     * Individual tabs
     *
     * @property children
     * @type {Object | Array}
     */
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,

    /**
     * Aligns the tab headers
     *
     * @property align
     * @type {String}
     */
    align: PropTypes.string,

    /**
     * Emitted when the visible tab is changed
     *
     * @property onTabChange
     * @type {Func}
     */
    onTabChange: PropTypes.func,

    /**
     * The position of tabs with respect to the content (top (default) or left)
     *
     * @property position
     * @type {String}
     */
    position: PropTypes.string
  }

  static defaultProps = {
    renderHiddenTabs: true,
    align: 'left',
    position: 'top'
  }

  static childContextTypes = {

    /**
     * Defines a context object for tab of the tabs component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property tab
     * @type {Object}
     */
    tabs: PropTypes.object
  }

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
  }

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
    if (this.props.selectedTabId !== nextProps.selectedTabId &&
        nextProps.selectedTabId !== this.state.selectedTabId) {
      this.updateVisibleTab(nextProps.selectedTabId);
    }
  }

  /**
   * Store the window object as property.
   *
   * @property _window
   * @type {Object}
   */
  _window = window

  /**
   * Sets the validity state of the given tab (id) to the
   * given state (valid)
   *
   * @method changeValidity
   * @param {Number} id tab identifier
   * @param {Boolean} state of tab child
   */
  changeValidity = (id, valid) => {
    this.setState({ tabValidity: this.state.tabValidity.set(id, valid) });
  }

  /**
   * Sets the warning state of the given tab (id)
   *
   * @method changeWarning
   * @param {Number} id tab identifier
   * @param {Boolean} state of tab child
   */
  changeWarning = (id, warning) => {
    this.setState({ tabWarning: this.state.tabWarning.set(id, warning) });
  }

  /**
   * Handles the changing of tabs
   *
   * @method handleTabClick
   * @param {Event} ev Click Event
   */
  handleTabClick = (ev) => {
    if (Event.isEnterKey(ev) || !Event.isEventType(ev, 'keydown')) {
      const tabid = ev.target.dataset.tabid;
      this.updateVisibleTab(tabid);
    }
  }

  updateVisibleTab(tabid) {
    const url = `${this._window.location.origin}${this._window.location.pathname}#${tabid}`;
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
  get mainClasses() {
    return classNames(
      'carbon-tabs',
      `carbon-tabs__position-${this.props.position}`,
      this.props.className
    );
  }

  tabsHeaderClasses = () => {
    return classNames(
      'carbon-tabs__headers',
      `carbon-tabs__headers--align-${this.props.align}`,
       'carbon-tabs__headers'
    );
  }

  tabHeaderClasses = (tab) => {
    const tabHasError = this.state.tabValidity.get(tab.props.tabId) === false,
        tabHasWarning = this.state.tabWarning.get(tab.props.tabId) === true && !tabHasError;

    return classNames(
      'carbon-tabs__headers__header',
      tab.props.headerClassName,
      {
        'carbon-tabs__headers__header--error': tabHasError,
        'carbon-tabs__headers__header--warning': tabHasWarning,
        'carbon-tabs__headers__header--selected': tab.props.tabId === this.state.selectedTabId
      }
    );
  }

  /**
   * Build the headers for the tab component
   *
   * @method tabHeaders
   * @return Unordered list of tab titles
   */
  get tabHeaders() {
    const tabTitles = compact(React.Children.toArray(this.props.children)).map((child) => {
      return (
        <li
          className={ this.tabHeaderClasses(child) }
          data-element='select-tab'
          data-tabid={ child.props.tabId }
          key={ child.props.tabId }
          onClick={ this.handleTabClick }
          onKeyDown={ this.handleTabClick }
          ref={ `${child.props.tabId}-tab` }
          tabIndex='0'
        >
          { child.props.title }
        </li>
      );
    });

    return (
      <ul className={ this.tabsHeaderClasses() } >
        { tabTitles }
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

    compact(React.Children.toArray(this.props.children)).forEach((child) => {
      if (child.props.tabId === this.state.selectedTabId) {
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
    if (!this.props.renderHiddenTabs) { return this.visibleTab; }

    const tabs = compact(React.Children.toArray(this.props.children)).map((child) => {
      let klass = 'hidden';

      if (child.props.tabId === this.state.selectedTabId) {
        klass = 'carbon-tab--selected';
      }

      return React.cloneElement(child, { className: klass });
    });

    return tabs;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('tabs', this.props) }>
        { this.tabHeaders }
        { this.tabs }
      </div>
    );
  }
}

export { Tabs, Tab };
