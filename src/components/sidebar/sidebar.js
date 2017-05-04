import React from 'react';
import PropTypes from 'prop-types';
import SidebarHeader from './sidebar-header';
import Icon from './../icon';
import Modal from './../modal';
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
 *     onCancel={ closeSidebar }
 *     open={ true }
 *   />
 *
 * Side bar is positioned on the right hand screen of the window by default.
 * To position the sidebar on the left hand side pass `position='left'` to the component.
 *
 * The background behind the sidebar is disabled by default. To allow the user to interact
 * with all the UI pass `enableBackgroundUI={ true}` to the component
 *
 * @class Sidebar
 * @constructor
 */
class Sidebar extends Modal {

  static propTypes = {

    /**
     * A custom close event handler
     *
     * @property onCancel
     * @type {Function}
     */
    onCancel: PropTypes.func,

    /**
     * Sets the open state of the sidebar
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: PropTypes.bool,

    /**
     * Determines if the user can interact with
     * the background ui when the sidebar is open
     *
     * @property enableBackgroundUI
     * @type {Boolean}
     * @default false
     */
    enableBackgroundUI: PropTypes.bool,

    /**
     * Determines the position of the sidebar
     * 'left' or 'right'
     *
     * @property position
     * @type {String}
     * @default 'right'
     */
    position: PropTypes.string,

    /**
     * Size of dialog, default size is 450px
     *
     * @property size
     * @type {String}
     * @default medium
     */
    size: PropTypes.string
  }

  static defaultProps = {
    position: 'right',
    size: 'medium'
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-sidebar',
      this.props.className
    );
  }

  /**
   * Returns classes for the sidebar.
   *
   * @method sidebarClasses
   * @return {String} sidebar className
   */
  get sidebarClasses() {
    return classNames(
      'carbon-sidebar__sidebar',
      `carbon-sidebar__sidebar--${this.props.position}`,
      `carbon-sidebar__sidebar--${this.props.size}`
    );
  }

  /**
   * Returns the markup for the close icon.
   *
   * @method closeButton
   * @return {Object} JSX
   */
  get closeButton() {
    if (this.props.onCancel) {
      return (
        <span className={ 'carbon-sidebar__close' } >
          <Icon
            className="carbon-sidebar__close-icon"
            data-element='close'
            onClick={ this.props.onCancel }
            type="close"
          />
        </span>
      );
    }
  }

  componentTags(props) {
    return {
      'data-component': 'sidebar',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Returns the computed HTML for the sidebar.
   *
   * @method sidebarHTML
   * @return {Object} JSX for sidebar
   */
  get modalHTML() {
    return (
      <div
        className={ this.sidebarClasses }
        { ...this.componentTags(this.props) }
      >
        { this.closeButton }
        { this.props.children }
      </div>
    );
  }

  get transitionName() {
    return `sidebar--${this.props.position}`;
  }
}

export {
  Sidebar,
  SidebarHeader
};
