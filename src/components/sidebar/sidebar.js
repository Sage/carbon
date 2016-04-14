import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SidebarHeader from './sidebar-header';
import Icon from './../icon';
import classNames from 'classnames';

/**
 * A Sidebar widget.
 *
 * == How to use a Sidebar in a component:
 *
 * In your file
 *
 *   import { Sidebar } from 'carbon/lib/components/sidebar';
 *
 * To render the Sidebar:
 *
 *   <Sidebar
 *     onClose={ closeSidebar }
 *     open={ true }
 *   />
 *
 * Side bar is positioned on the right hand screen of the window by default.
 * To position the sidebar on the left hand side pass `position='left'` to the component.
 *
 * The background behind the sidebar is disabled by default. To allow the user to interact
 * with all the UI pass `disableBackground={ false }` to the component
 *
 * @class Sidebar
 * @constructor
 */
class Sidebar extends React.Component {

  listening = false;

  static propTypes = {

    /**
     * A custom close event handler
     *
     * @property onClose
     * @type {Function}
     */
    onClose: React.PropTypes.func.isRequired,

    /**
     * Sets the open state of the sidebar
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: React.PropTypes.bool,

    /**
     * Determines if the background is disabled
     * when the sidebar is open
     *
     * @property disableBackground
     * @type {Boolean}
     * @default true
     */
    disableBackground: React.PropTypes.bool,

    /**
     * Determines the position of the sidebar
     * 'left' or 'right'
     *
     * @property position
     * @type {String}
     * @default 'right'
     */
    position: React.PropTypes.string
  }

  static defaultProps = {
    open: false,
    disableBackground: true,
    position: 'right'
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   *
   * @method componentDidUpdate
   * @return {void}
   */
  componentDidUpdate() {
    if (this.props.open && !this.listening) {
      window.addEventListener('keyup', this.closeSidebar);
    } else if (!this.props.open) {
      window.removeEventListener('keyup', this.closeSidebar);
    }
  }

  /**
   * Triggers the custom close event handler on ESC
   *
   * @method closeSidebar
   * @param {Object} ev event
   * @return {void}
   */
  closeSidebar = (ev) => {
    if (ev.keyCode === 27) {
      this.props.onClose();
    }
  }

  /**
   * Returns classes for the sidebar.
   *
   * @method sidebarClasses
   * @return {String} sidebar className
   */
  get sidebarClasses() {
    return classNames(
      'ui-sidebar__sidebar',
      `ui-sidebar__sidebar--${this.props.position}`
    );
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'ui-sidebar',
      this.props.className
    );
  }


  /**
   * Returns HTML for the background.
   *
   * @method backgroundHTML
   * @return {Object} JSX
   */
  get backgroundHTML() {
    if (this.props.disableBackground) {
      return <div onClick={ this.props.onClose } className="ui-sidebar__background"></div>;
    }
  }

  /**
   * Returns the computed HTML for the sidebar.
   *
   * @method sidebarHTML
   * @return {Object} JSX for sidebar
   */
  get sidebarHTML() {
    return (
      <div className={ this.sidebarClasses } >
        <span className={ 'ui-sidebar__close' } >
          <Icon className="ui-sidebar__close-icon" type="close" onClick={ this.props.onClose } />
        </span>
        { this.props.children }
      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let backgroundHTML,
        sidebarHTML;

    if (this.props.open) {
      backgroundHTML = this.backgroundHTML;
      sidebarHTML= this.sidebarHTML;
    }

    return (
      <div className={ this.mainClasses }>
        <ReactCSSTransitionGroup
          transitionName={ `sidebar--${this.props.position}` }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { sidebarHTML }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="sidebar-background"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { backgroundHTML }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export {
  Sidebar,
  SidebarHeader
};
