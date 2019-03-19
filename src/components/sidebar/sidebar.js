import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SidebarHeader from './sidebar-header';
import Icon from '../icon';
import Modal from '../modal';
import './sidebar.scss';

class Sidebar extends Modal {
  static propTypes = {
    /**
     * A callback for when cancelling the dialog is triggered. You can use this callback to close the dialog.
     */
    onCancel: PropTypes.func,

    /**
     * A boolean to track the open state of the dialog.
     */
    open: PropTypes.bool,

    /**
     * Set this prop to false to hide the translucent background when the dialog is open.
     */
    enableBackgroundUI: PropTypes.bool,

    /**
     * Sets the position of sidebar, either left or right.
     */
    position: PropTypes.string,

    /**
     * Sets the size of the sidebar when open.
     */
    size: PropTypes.string
  };

  static defaultProps = {
    position: 'right',
    size: 'medium',
    open: false,
    enableBackgroundUI: false
  };

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames('carbon-sidebar', this.props.className);
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
        <span className='carbon-sidebar__close'>
          <Icon
            className='carbon-sidebar__close-icon'
            data-element='close'
            onClick={ this.props.onCancel }
            type='close'
          />
        </span>
      );
    }
    return null;
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
      <div className={ this.sidebarClasses } { ...this.componentTags(this.props) }>
        {this.closeButton}
        {this.props.children}
      </div>
    );
  }

  get transitionName() {
    return `sidebar--${this.props.position}`;
  }
}

export { Sidebar, SidebarHeader };
