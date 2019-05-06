import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/icon';
import Modal from '../modal/modal';
import { SidebarStyle, SidebarCloseStyle } from './sidebar.style';
import './sidebar.scss';

class Sidebar extends Modal {
  /** Returns classes for the component. */
  get mainClasses() {
    return classNames(
      'carbon-sidebar',
      this.props.className
    );
  }

  /** Returns the markup for the close icon. */
  get closeButton() {
    if (this.props.onCancel) {
      return (
        <SidebarCloseStyle>
          <Icon
            className='carbon-sidebar__close-icon'
            data-element='close'
            onClick={ this.props.onCancel }
            type='close'
          />
        </SidebarCloseStyle>
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

  /** Returns the computed HTML for the sidebar. */
  get modalHTML() {
    return (
      <SidebarStyle
        position={ this.props.position }
        size={ this.props.size }
        { ...this.componentTags(this.props) }
      >
        { this.closeButton }
        { this.props.children }
      </SidebarStyle>
    );
  }

  get transitionName() {
    return `sidebar--${this.props.position}`;
  }
}

Sidebar.propTypes = {
  onCancel: PropTypes.func,
  /** A boolean to track the open state of the dialog */
  open: PropTypes.bool,
  /** Set this prop to false to hide the translucent background when the dialog is open. */
  enableBackgroundUI: PropTypes.bool,
  /** Sets the position of sidebar, either left or right. */
  position: PropTypes.string,
  /** Sets the size of the sidebar when open. */
  size: PropTypes.string
};

Sidebar.defaultProps = {
  position: 'right',
  size: 'small',
  open: false,
  enableBackgroundUI: false
};

export default Sidebar;
