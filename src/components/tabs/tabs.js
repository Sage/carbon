import React from 'react';

/**
 * A Tabs widget.
 *
 * == How to use a Tabs Widget in a component:
 *
 * In your file
 *
 *   import Tabs from 'carbon/lib/components/tabs';
 *   import Tabs from 'carbon/lib/components/tab';
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
class Tabs extends React.Component {

  static propTypes = {

    /**
     * Should the unfocussed tabs be rendered to the page
     *
     * @property renderHiddenTabs
     * @type {Boolean}
     * @default true
     */
    renderHiddenTabs: React.PropTypes.bool,

    /**
     * The selected tab on page load
     * Defaults to the first tab
     *
     * @property initialSelectedTabId
     * @type {String}
     * @default firstTab
     */
    initialSelectedTabId : React.PropTypes.string
  }

  static defaultProps = {
    renderHiddenTabs: true
  }

  static childContextTypes = {

    /**
     * Defines a context object for tab of the tabs component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property tab
     * @type {Object}
     */
    tabs: React.PropTypes.object
  }

  /**
   * Returns tabs object to tab component.
   *
   * @method getChildContext
   */
  getChildContext() {
    return {
      tabs: {
        changeValidity: this.changeValidity
      }
    };
  }

  state = {

    /**
     * Tracks the validity of each tab
     *
     * @property tabValidity
     * @type {Object}
     */
    tabValidity: {}
  }

  /**
   * A lifecycle method that is called after before initial render.
   * Can set up state of component without causing a re-render
   *
   * @method componentWillMount
   */
  componentWillMount() {
    let initialSelectedTabId;

    if (this.props.initialTabId) {
      initialSelectedTabId = this.props.initialTabId;
    } else {
      if (React.Children.count(this.props.children) == 1) {
        initialSelectedTabId = this.props.children.props.tabId;
      } else {
        initialSelectedTabId = this.props.children[0].props.tabId;
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
  changeValidity = (id, valid) => {
    let tabValidity = this.state.tabValidity;
    tabValidity[id] = valid;
    this.setState({ tabValidity: tabValidity });
  }

  /**
   * Handles the changing of tabs
   *
   * @method handleTabClick
   * @param {Event} ev Click Event
   */
  handleTabClick = (ev) => {
    this.setState({ selectedTabId: ev.target.dataset.tabid });
  }

  /**
   * Classes to be applied to the whole tabs component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    let classes = 'ui-tabs ';

    if (this.props.className) {
      classes += this.props.className;
    }
    return classes;
  }

  tabHeaderClasses = (tab) => {
    let classes = 'ui-tabs__headers__header';

    if (this.state.tabValidity[tab.props.tabId] == false) {
      classes += ' ui-tabs__headers__header--error';
    }

    if (tab.props.tabId === this.state.selectedTabId) {
      classes += ' ui-tabs__headers__header--selected';
    }

    return classes;
  }

  /**
   * Build the headers for the tab component
   *
   * @method tabHeaders
   * @return Unordered list of tab titles
   */
  get tabHeaders() {
    let tabTitles = React.Children.map(this.props.children, ((child) => {

      return(
        <li
          className={ this.tabHeaderClasses(child) }
          onClick={ this.handleTabClick }
          key={ child.props.tabId }
          data-tabid={ child.props.tabId } >
            { child.props.title }
        </li>);
    }));

    return <ul className='ui-tabs__headers' >{ tabTitles }</ul>;
  }

  /**
   * Builds the single currently selected tab
   *
   * @method visibleTab
   * @return {JSX} visible tab
   */
  get visibleTab() {
    let visibleTab;

    React.Children.forEach(this.props.children, ((child) => {
      if (child.props.tabId == this.state.selectedTabId) {
        visibleTab = child;
      }
    }));

    return React.cloneElement(visibleTab, { className: 'ui-tab--selected' });
  }

  /**
   * Builds all tabs where non selected tabs have class of hidden
   *
   * @method tabs
   * @return {JSX} all tabs
   */
  get tabs() {
    if (!this.props.renderHiddenTabs) { return this.visibleTab; }

    let tabs;

    tabs = React.Children.map(this.props.children, ((child) => {
      let klass = 'hidden';

      if (child.props.tabId === this.state.selectedTabId) {
        klass = 'ui-tab--selected';
      }

      return React.cloneElement(child, { className: klass });
    }));

    return tabs;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return(
      <div className={ this.mainClasses }>
        { this.tabHeaders }
        { this.tabs }
      </div>
    );
  }
}

export default Tabs;
