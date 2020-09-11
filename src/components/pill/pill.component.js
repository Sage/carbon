import React from 'react';
import PropTypes from 'prop-types';
import StyledPill from './pill.style';
import Icon from '../icon';
import { validProps } from '../../utils/ether/ether';
import tagComponent from '../../utils/helpers/tags/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import IconButton from '../icon-button';

class Pill extends React.Component {
  static safeProps = ['onClick']

  renderCloseIcon() {
    const { onDelete } = this.props;
    return (
      <IconButton
        onAction={ onDelete }
        data-element='close'
        aria-label='close'
      >
        <Icon
          type='cross'
          bgSize='small'
          bgTheme='none'
        />
      </IconButton>
    );
  }

  render() {
    const {
      fill,
      as,
      onDelete,
      colorVariant,
      pillRole,
      children,
      size,
      ml,
      mr
    } = this.props;
    return (
      <StyledPill
        { ...validProps(this) }
        inFill={ fill }
        colorVariant={ colorVariant || as }
        isDeletable={ onDelete }
        pillRole={ pillRole }
        size={ size }
        ml={ ml }
        mr={ mr }
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
  colorVariant: PropTypes.oneOf([...OptionsHelper.pillColors, 'warning']),

  /** This component supports children.  */
  children: PropTypes.string.isRequired,

  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill: PropTypes.bool,

  /** Sets the type of pill in use. */
  pillRole: PropTypes.oneOf([...OptionsHelper.pillRoles]),

  /** Callback function for when the pill is clicked. */
  onClick: PropTypes.func,

  /** Callback function to delete the component, when the added Icon is clicked. */
  onDelete: PropTypes.func,

  /** Assigns a size to the button: "S" | "M" | "L" | "XL" */
  size: PropTypes.oneOf(OptionsHelper.pillSizesRestricted),

  /** Margin right, given number will be multiplied by base spacing unit (8) */
  mr: PropTypes.number,

  /** Margin left, given number will be multiplied by base spacing unit (8) */
  ml: PropTypes.number
};

Pill.defaultProps = {
  as: 'default',
  fill: false,
  onClick: null,
  onDelete: null,
  pillRole: 'tag',
  size: 'M'
};

export default Pill;
