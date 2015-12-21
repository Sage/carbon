import React from 'react';

/**
 * A Tab widget.
 *
 * == How to use a Form in a component:
 *
 * In your file
 *
 *   import Tab from 'carbon/lib/components/tab';
 *   import TabItem from 'carbon/lib/components/tab-item';
 *
 * To render a Tab:
 *
 *   <Tabs>
 *     <Tab title='Title 1'>
 *
 *       <Textbox />
 *       <Textbox />
 *
 *     </Tab>
 *
 *     <Tab title='Title 2'>
 *
 *       <Date />
 *       <Textbox />
 *
 *     </Tab>
 *   </Tabs>
 *
 * Optionally, you can pass `renderHiddenTabs` prop to the Tab. By default this is
 * set to true and therefore all tabs with be rendered. The selected tab with have
 * a class of `selected` and all other tabs will have a class of `hidden` which sets
 * their display to `none`.
 * Setting `renderHiddenTabs to false will add a small performance improvement as the
 * other tabs will not be rendered to the page however this will not work correctly
 * when a form needs to validte fields on non visible tabs.
 *
 * @class Tab 
 * @constructor
 */
class Tab extends React.Component {

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
     * The number of child tabs
     *
     * @property numberOfTabs 
     * @type {Number}
     */
    numberOfTabs: React.PropTypes.number
  }

  static defaultProps = {
    renderHiddenTabs: true,
  }

  static childContextTypes = {

    /**
     * Defines a context object for tab of the tabs component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property tab
     * @type {Object}
     */
    tab: React.PropTypes.object
  }

  /**
   * Returns tabs object to tab component.
   *
   * @method getChildContext
   */
  getChildContext() {
    return {
      tab: {
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
    let numOfTabs = this.props.numberOfTabs || React.Children.count(this.props.children);
    let initialSelectedTab = this.props.initialTab || 0;

    this.setState({ numberOfTabs: numOfTabs, selectedTab: initialSelectedTab });
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
    tabValidity[id] = valid
    this.setState({ tabValidity: tabValidity });  
  }

  /**
   * Handles the changing of tabs
   *
   * @method handleTabClick
   * @param {Event} ev Click Event
   */
  handleTabClick = (ev) => {
    this.setState({ selectedTab: Number(ev.target.dataset.tab) })
  }

  /**
   * Classes to be applied to the whole tabs component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-tab';
  }

  /**
   * Build the headers for the tab component
   *
   * @method tabHeaders
   * @return Unordered list of tab titles
   */
  get tabHeaders() {
    let tabTitles = React.Children.map(this.props.children, ((child, index) => {

      let validClass = ''
       
      if (this.state.tabValidity[index] == false) {
        validClass = ' ui-tab__headers__header--error';
      }

      let selectedClassName = index === this.state.selectedTab ? ' selected' : '';

      return(
      <li
        className={ "ui-tab__headers__header" + selectedClassName + validClass }
        onClick={ this.handleTabClick }
        key={ child.props.title }
        data-tab={ index } >
          { child.props.title }
      </li>);
    }));

    return <ul className='ui-tab__headers' >{ tabTitles }</ul>;
  }

  /**
   * Builds the single currently selected tab
   *
   * @method visibleTab
   * @return {JSX} visible tab
   */
  get visibleTab() {
    let clone = React.cloneElement(child, { id: this.selectedTab });
    return <div className='selected'>{ clone }</div>
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

    tabs = React.Children.map(this.props.children, ((child, index) => {
      let klass = 'hidden';

      if (index === this.state.selectedTab) {
        klass = 'selected';
      }

      let clone = React.cloneElement(child, { id: index });
      return <div className={ klass }>{ clone }</div>
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

export default Tab;
