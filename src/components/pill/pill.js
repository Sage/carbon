import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/icon';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './pill.scss';

class Pill extends React.Component {
  static propTypes = {

    /**
     * Sets the theme of the notification.
     */
    as: PropTypes.string,

    /**
     * This component supports children.
     */
    children: PropTypes.string.isRequired,

    /**
     * A custom class name for the component.
     */
    className: PropTypes.string,

    /**
     * Fills the pill background with colour. When fill is false only the border is coloured.
     */
    fill: PropTypes.bool,

    /**
     * Callback function for when the pill is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Callback function to delete the component, when the added Icon is clicked.
     */
    onDelete: PropTypes.func
  }

  static defaultProps = {
    as: 'default',
    className: '',
    fill: false,
    onClick: null,
    onDelete: null
  }

  static safeProps = ['onClick']

  mainClasses() {
    return classNames(
      'carbon-pill',
      this.props.className,
      `carbon-pill--${this.props.as}${(this.props.fill ? '--fill' : '--empty')}`,
      {
        'carbon-pill--link': this.props.onClick,
        'carbon-pill--is-deletable': this.props.onDelete
      }
    );
  }

  renderCloseIcon() {
    if (!this.props.onDelete) return null;
    return (
      <button
        className='carbon-pill__delete-icon'
        type='button'
        onClick={ this.props.onDelete }
        data-element='close'
      >
        <Icon type='cross' bgSize='small' />
      </button>
    );
  }

  render() {
    return (
      <span
        { ...validProps(this) }
        className={ this.mainClasses() }
        { ...tagComponent('pill', this.props) }
      >
        { this.props.children }
        { this.renderCloseIcon() }
      </span>
    );
  }
}

export default Pill;
