import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import StyledButton from './button.style';

const checkPosition = position => position === 'before' || position === 'after';

const renderButtonIcon = (props) => {
  const { children } = props;
  if (!checkPosition(props.iconPosition) || !props.iconType) return children;

  if (props.iconPosition === 'before') return [children, <Icon key='btn-icon' type={ props.iconType } />];

  return [<Icon key='btn-icon' type={ props.iconType } />, children];
};

const Button = (props) => {
  return (
    <StyledButton
      { ...props }
      role='button'
    >
      { renderButtonIcon(props) }
    </StyledButton>
  );
};

Button.propTypes = {
  renderAs: PropTypes.string, // Customises the appearance can be set to 'primary', 'secondary', 'tertiary'
  children: PropTypes.node.isRequired, // Required, what the button displays
  disabled: PropTypes.bool, // Apply disabled state to the button
  size: PropTypes.string, // Assigns a size to the button
  iconPosition: PropTypes.string, // Defines an Icon position within the button 'before' / 'after'
  iconType: PropTypes.string // Defines an Icon type within the button
};

Button.defaultProps = {
  renderAs: 'secondary',
  size: 'medium',
  disabled: false
};

export default Button;
