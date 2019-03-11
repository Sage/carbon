import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import StyledButton from './button.style';

const propsNotForElement = [
  'as',
  'children'
];

const checkPosition = position => position === 'before' || position === 'after';

const renderButtonIcon = (props) => {
  const { children } = props;
  if (props.disabled || !checkPosition(props.iconPosition) || !props.iconType) return children;

  if (props.iconPosition === 'before') return [children, <Icon key='btn-icon' type={ props.iconType } />];

  return [<Icon key='btn-icon' type={ props.iconType } />, children]; // pass in style props to icon
};

const filterProps = (props) => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (!propsNotForElement.includes(key)) acc[key] = value;
    return acc;
  }, {});
};

const Button = (props) => {
  return (
    <StyledButton
      renderAs={ props.as }
      { ...filterProps(props) }
      role='button'
    >
      { renderButtonIcon(props) }
    </StyledButton>
  );
};

Button.propTypes = {
  as: PropTypes.string, // Customises the appearance can be set to 'primary', 'secondary', 'tertiary' or 'destructive'
  children: PropTypes.node.isRequired, // Required, what the button displays
  disabled: PropTypes.bool, // Apply disabled state to the button
  size: PropTypes.string, // Assigns a size to the button
  iconPosition: PropTypes.string, // Defines an Icon position within the button 'before' / 'after'
  iconType: PropTypes.string // Defines an Icon type within the button
};

Button.defaultProps = {
  as: 'secondary',
  size: 'medium',
  disabled: false
};

export default Button;
