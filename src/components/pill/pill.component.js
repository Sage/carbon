import React from 'react';
import PropTypes from 'prop-types';
import StyledPill from './pill.style';
import Icon from '../icon/icon';
import { validProps } from '../../utils/ether/ether';
import tagComponent from '../../utils/helpers/tags/tags';

class Pill extends React.Component {
  static safeProps = ['onClick']

  renderCloseIcon() {
    return (
      <button
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
      <StyledPill
        { ...validProps(this) }
        inFill={ this.props.fill }
        styledAs={ this.props.as }
        isDeletable={ this.props.onDelete }
        { ...tagComponent('pill', this.props) }
      >
        {this.props.children}
        {this.props.onDelete && this.renderCloseIcon()}
      </StyledPill>
    );
  }
}

Pill.propTypes = {

  /**
   * Sets the theme of the notification.
   */
  as: PropTypes.string,

  /**
   * This component supports children.
   */
  children: PropTypes.string.isRequired,

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
};

Pill.defaultProps = {
  as: 'default',
  fill: false,
  onClick: null,
  onDelete: null
};

export default Pill;
