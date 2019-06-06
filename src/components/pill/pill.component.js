import React from 'react';
import PropTypes from 'prop-types';
import StyledPill from './pill.style';
import Icon from '../icon/icon';
import { validProps } from '../../utils/ether/ether';
import tagComponent from '../../utils/helpers/tags/tags';
import OptionsHelper from '../../utils/helpers/options-helper';

class Pill extends React.Component {
  static safeProps = ['onClick']

  renderCloseIcon() {
    const { onDelete } = this.props;
    return (
      <button
        type='button'
        onClick={ onDelete }
        data-element='close'
      >
        <Icon type='cross' bgSize='small' />
      </button>
    );
  }

  render() {
    const {
      fill,
      as,
      onDelete,
      colourVariant,
      children
    } = this.props;
    return (
      <StyledPill
        { ...validProps(this) }
        inFill={ fill }
        colourVariant={ colourVariant || as }
        isDeletable={ onDelete }
        { ...tagComponent('pill', this.props) }
      >
        { children }
        { onDelete && this.renderCloseIcon() }
      </StyledPill>
    );
  }
}

Pill.propTypes = {

  /** Sets the theme of the notification [legacy]. */
  as: PropTypes.oneOf([...OptionsHelper.colors, 'disabled']),

  /** Sets the theme of the notification. */
  colourVariant: PropTypes.oneOf([...OptionsHelper.pillColours]),

  /** This component supports children.  */
  children: PropTypes.string.isRequired,

  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill: PropTypes.bool,

  /** Callback function for when the pill is clicked. */
  onClick: PropTypes.func,

  /** Callback function to delete the component, when the added Icon is clicked. */
  onDelete: PropTypes.func
};

Pill.defaultProps = {
  as: 'default',
  fill: false,
  onClick: null,
  onDelete: null
};

export default Pill;
