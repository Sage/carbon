import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * A Tab widget.
 *
 * == How to use a Tab Widget in a component:
 *  See Tabs component
 *
 * @class Tab
 * @constructor
 */
class Tab extends React.Component {
  static propTypes = {
    /**
     * The id of the corresponding control that must be activated to show the tab
     */
    'aria-labelledby': PropTypes.string,

    /**
     * The role of the component
     */
    role: PropTypes.string,

    /**
     * Visible title in tabs header
     * Consumed within tabs component
     */
    title: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types

    /**
     * id to identify the tab within the component
     * used when validating and switching tabs
     */
    tabId: PropTypes.string.isRequired,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * Children elements
     */
    children: PropTypes.node
  }

  static defaultProps = {
    className: '',
    children: null,
    role: 'tabPanel'
  }

  static contextTypes = {

    /**
     * Defines what contexts are available to this tab componenet
     * https://facebook.github.io/react/docs/context.html
     */
    tabs: PropTypes.object
  }

  static childContextTypes = {

    /**
     * Defines a context object for context children of this tab component.
     * https://facebook.github.io/react/docs/context.html
     */
    tab: PropTypes.object
  }

  /**
   * Returns tab object to context children.
   *
   * @method getChildContext
   */
  getChildContext() {
    return {
      tab: {
        setValidity: this.setValidity,
        setWarning: this.setWarning
      }
    };
  }

  /**
   * Classes to be applied to the single tab component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return classNames(
      'carbon-tab',
      this.props.className
    );
  }

  /**
   * Sets valid state to passed param
   * It notifies the parent context of the change
   * and sets the current valid state to the new value
   *
   * @method setValidity
   * @param {Boolean} valid updates validity of this tab
   */
  setValidity = (valid) => {
    this.context.tabs.changeValidity(this.props.tabId, valid);
  }

  /**
   * Sets warning state to passed param
   * It notifies the parent context of the change
   * and sets the current warning state to the new value
   */
  setWarning = (warning) => {
    this.context.tabs.changeWarning(this.props.tabId, warning);
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div
        aria-labelledby={ this.props['aria-labelledby'] }
        className={ this.mainClasses }
        role={ this.props.role }
      >
        { this.props.children }
      </div>
    );
  }
}

export default Tab;
