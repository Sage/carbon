import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { compact } from 'lodash';
import Tab from './tab/tab.component';
import Event from '../../utils/helpers/events';
import tagComponent from '../../utils/helpers/tags';
import Browser from '../../utils/helpers/browser';
import StyledTabs from './tabs.style';
import TabsHeader from './tabs-header/tabs-header.component';
import TabTitle from './tab-title/tab-title.component';
import OptionsHelper from '../../utils/helpers/options-helper';

class Tabs extends React.Component {
  static childContextTypes = {
    /**
     * Defines a context object for tab of the tabs component.
     * https://facebook.github.io/react/docs/context.html
     *
     */
    tabs: PropTypes.object
  };

  state = {
    /**
     * Tracks the validity of each tab
     */
    tabValidity: Immutable.Map(),

    /**
     * Tracks the warning of each tab
     */
    tabWarning: Immutable.Map()
  };

  /**
   * Returns tabs object to tab component.
   */
  getChildContext() {
    return {
      tabs: {
        changeValidity: this.changeValidity,
        changeWarning: this.changeWarning
      }
    };
  }

  UNSAFE_componentWillMount() {
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.selectedTabId !== nextProps.selectedTabId && nextProps.selectedTabId !== this.state.selectedTabId) {
      this.updateVisibleTab(nextProps.selectedTabId);
    }
  }

  // ** Store the window object as property. */
  _window = Browser.getWindow();

  /**
   * Sets the validity state of the given tab (id) to the
   * given state (valid)
   */
  changeValidity = (id, valid) => {
    this.setState(prevState => ({ tabValidity: prevState.tabValidity.set(id, valid) }));
  };

  /**
   * Sets the warning state of the given tab (id)
   */
  changeWarning = (id, warning) => {
    this.setState(prevState => ({ tabWarning: prevState.tabWarning.set(id, warning) }));
  };

  /**
   * Handles the changing of tabs with the mouse
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
   */
  updateVisibleTab(tabid) {
    if (this.props.setLocation) {
      const url = `${this._window.location.origin}${this._window.location.pathname}#${tabid}`;
      this._window.history.replaceState(null, 'change-tab', url);
    }

    this.setState({ selectedTabId: tabid });

    if (this.props.onTabChange) {
      this.props.onTabChange(tabid);
    }
  }

  /**
   * Focuses the tab for the reference specified
   */
  focusTab(ref) {
    const domNode = ReactDOM.findDOMNode(ref); // eslint-disable-line react/no-find-dom-node
    domNode.focus();
  }

  getTabValidationValues = (tab) => {
    const tabHasError = this.state.tabValidity.get(tab.props.tabId) === false,
        tabHasWarning = this.state.tabWarning.get(tab.props.tabId) === true && !tabHasError;
    return { tabHasError, tabHasWarning };
  };

  // ** Returns true/false for if the given tab id is selected. */
  isTabSelected = tabId => tabId === this.state.selectedTabId;

  /**
   * The children nodes converted into an Array
   */
  get children() {
    return compact(React.Children.toArray(this.props.children));
  }

  /**
   * Array of the tabIds for the child nodes
   */
  get tabIds() {
    return this.children.map(child => child.props.tabId);
  }

  /**
   * Build the headers for the tab component
   */
  get tabHeaders() {
    this.tabRefs = [];
    const tabTitles = this.children.map((child, index) => {
      const ref = `${child.props.tabId}-tab`;
      this.tabRefs.push(ref);
      const tabValidationValues = this.getTabValidationValues(child);
      const { tabHasError, tabHasWarning } = tabValidationValues;
      return (
        <TabTitle
          position={ this.props.position }
          className={ child.props.className || '' }
          dataTabId={ child.props.tabId }
          id={ ref }
          key={ child.props.tabId }
          onClick={ this.handleTabClick }
          onKeyDown={ this.handleKeyDown(index) }
          ref={ (node) => {
            this[ref] = node;
          } }
          tabIndex={ this.isTabSelected(child.props.tabId) ? '0' : '-1' }
          title={ child.props.title }
          isTabSelected={ this.isTabSelected(child.props.tabId) }
          tabHasError={ tabHasError }
          tabHasWarning={ tabHasWarning }
        />
      );
    });

    return (
      <TabsHeader
        align={ this.props.align } position={ this.props.position }
        role='tablist'
      >
        {tabTitles}
      </TabsHeader>
    );
  }

  /**
   * Builds the single currently selected tab
   */
  get visibleTab() {
    let visibleTab;

    this.children.forEach((child) => {
      if (this.isTabSelected(child.props.tabId)) {
        visibleTab = child;
      }
    });

    return React.cloneElement(visibleTab, { isTabSelected: this.isTabSelected(visibleTab.props.tabId) });
  }

  /**
   * Builds all tabs where non selected tabs have class of hidden
   */
  get tabs() {
    if (!this.props.renderHiddenTabs) {
      return this.visibleTab;
    }

    const tabs = this.children.map((child, index) => {
      return (
        <Tab
          role='tabpanel'
          title={ child.props.title }
          tabId={ child.props.tabId }
          position={ this.props.position }
          key={ this.tabRefs[index] }
          ariaLabelledby={ this.tabRefs[index] }
          isTabSelected={ this.isTabSelected(child.props.tabId) }
        >
          {child.props.children}
        </Tab>
      );
    });

    return tabs;
  }

  /**
   * Determines if the tab titles are in a vertical format.
   */
  isVertical(position) {
    return position === 'left';
  }

  render() {
    return (
      <StyledTabs
        className={ this.props.className } position={ this.props.position }
        { ...tagComponent('tabs', this.props) }
      >
        {this.tabHeaders}
        {this.tabs}
      </StyledTabs>
    );
  }
}

// ** Defines a context object for tab of the tabs component.
// https://facebook.github.io/react/docs/context.html */
Tabs.childContextTypes = {
  tabs: PropTypes.object
};

Tabs.defaultProps = {
  renderHiddenTabs: true,
  align: 'left',
  position: 'top',
  setLocation: true
};

Tabs.propTypes = {
  className: PropTypes.string,
  renderHiddenTabs: PropTypes.bool,
  selectedTabId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  onTabChange: PropTypes.func,
  position: PropTypes.oneOf(['top', 'left']),
  setLocation: PropTypes.bool
};

export { Tabs, Tab };
