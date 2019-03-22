import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import StyledButton, { StyledButtonSubtext } from './button.style';
import tagComponent from '../../utils/helpers/tags';
import Link from '../link';

const Button = (props) => {
  const {
    as,
    disabled,
    iconPosition,
    iconType,
    theme,
    ...rest
  } = props;

  if (props.href || props.to) {
    return (
      <Link
        role='button'
        variant={ theme }
        { ...tagComponent('button', props) }
        { ...rest }
      >
        { renderChildren(props) }
      </Link>
    );
  }
  return (
    <StyledButton
      disabled={ disabled }
      renderAs={ as }
      role='button'
      iconType={ iconType }
      iconPosition={ iconPosition }
      variant={ theme }
      { ...tagComponent('button', props) }
      { ...rest }
    >
      { renderChildren(props) }
    </StyledButton>
  );
};

function renderChildren({
  iconType,
  iconPosition,
  size,
  subtext,
  children
}) {
  return (
    <>
      { iconType && iconPosition === 'before' && <Icon type={ iconType } /> }
      <span>
        <span data-element='main-text'>{ children }</span>
        { size === 'large' && <StyledButtonSubtext data-element='subtext'>{ subtext }</StyledButtonSubtext> }
      </span>
      { iconType && iconPosition === 'after' && <Icon type={ iconType } /> }
    </>
  );
}

Button.propTypes = {
  as: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'destructive', 'darkBackground']),
  children: PropTypes.node.isRequired, // Required, what the button displays
  disabled: PropTypes.bool, // Apply disabled state to the button
  href: PropTypes.string,
  iconPosition: PropTypes.string, // Defines an Icon position within the button 'before' / 'after'
  iconType: PropTypes.string, // Defines an Icon type within the button
  size: PropTypes.string, // Assigns a size to the button
  subtext: (props) => {
    if (props.subtext.length > 0 && props.size !== 'large') {
      throw new Error('subtext prop has no effect unless the button is large');
    } else {
      return null;
    }
  }, // Second text child, renders under main text, only when size is "large"
  theme: PropTypes.oneOf(['blue', 'grey', 'magenta', 'magenta-dull', 'red', 'white']), // pass in legacy theme
  to: PropTypes.string
};

Button.defaultProps = {
  as: 'secondary',
  size: 'medium',
  disabled: false,
  iconPosition: '',
  iconType: '',
  subtext: '',
  theme: 'blue'
};

export default Button;
