import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import StyledButton, { StyledButtonSubtext } from './button.style';

const Button = ({
  as,
  children,
  disabled,
  iconPosition,
  iconType,
  size,
  subtext,
  ...props
}) => (
  <StyledButton
    renderAs={ as }
    disabled={ disabled }
    role='button'
    size={ size }
    iconPosition={ iconPosition }
    { ...props }
  >
    { iconType && iconPosition === 'before' && <Icon type={ iconType } /> }
    <span>
      <span data-element='main-text'>{ children }</span>
      { size === 'large' && <StyledButtonSubtext>{ subtext }</StyledButtonSubtext> }
    </span>
    { iconType && iconPosition === 'after' && <Icon type={ iconType } /> }
  </StyledButton>
);

Button.propTypes = {
  as: PropTypes.oneOf('primary', 'secondary', 'tertiary', 'destructive', 'darkBackground'),
  children: PropTypes.node.isRequired, // Required, what the button displays
  disabled: PropTypes.bool, // Apply disabled state to the button
  iconPosition: PropTypes.string, // Defines an Icon position within the button 'before' / 'after'
  iconType: PropTypes.string, // Defines an Icon type within the button
  size: PropTypes.string, // Assigns a size to the button
  subtext: PropTypes.string // Second text child, renders under main text, only works when size is "large"
};

Button.defaultProps = {
  as: 'secondary',
  size: 'medium',
  disabled: false,
  iconPosition: '',
  iconType: '',
  subtext: ''
};

export default Button;
