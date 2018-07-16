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
     *
     * @property aria-labelledby
     * @type {String}
     *
     */
    'aria-labelledby': PropTypes.string,

    /**
     * The role of the component
     *
     * @property role
     * @type {String}
     *
     */
    role: PropTypes.string,

    /**
     * Visible title in tabs header
     * Consumed within tabs component
     *
     * @property title
     * @type {String}
     *
     */
    title: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types

    /**
     * id to identify the tab within the component
     * used when validating and switching tabs
     *
     * @property tabId
     * @type {String}
     */
    tabId: PropTypes.string.isRequired,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Children elements
     *
     * @property children
     * @type {Node}
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
     *
     * @property tabs
     * @type {Object}
     */
    tabs: PropTypes.object
  }

  static childContextTypes = {

    /**
     * Defines a context object for context children of this tab component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property tab
     * @type {Object}
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
        addValidationState: this.addValidationState,
        removeValidationState: this.removeValidationState
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
  addValidationState = (valid, validation) => {
    if (validation.type == 'warning') {
      this.context.tabs.changeWarning(this.props.tabId, valid);
    } else {
      this.context.tabs.changeValidity(this.props.tabId, valid);
    }
  }
  removeValidationState = (valid, validation) => {
    if (validation.type == 'warning') {
      this.context.tabs.changeWarning(this.props.tabId, valid);
    } else {
      this.context.tabs.changeValidity(this.props.tabId, valid);
    }
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
