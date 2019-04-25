import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleInput,
  StyledButtonToggleIcon,
  StyledButtonToggleContentWrapper
} from './button-toggle.style';
import guid from '../../utils/helpers/guid';

const ButtonToggle = (props) => {
  const inputGuid = guid();

  function icon() {
    if (!props.buttonIcon) return null;

    return (
      <StyledButtonToggleIcon { ...props }>
        <Icon type={ props.buttonIcon } />
      </StyledButtonToggleIcon>
    );
  }

  function hiddenInput() {
    return (
      <StyledButtonToggleInput
        type='radio'
        name={ props.name }
        id={ inputGuid }
        disabled={ props.disabled }
      />
    );
  }

  return (
    <StyledButtonToggle { ...props }>
      {hiddenInput()}
      <StyledButtonToggleLabel
        { ...props } htmlFor={ inputGuid }
      >
        <StyledButtonToggleContentWrapper>
          {icon()}
          {props.children}
        </StyledButtonToggleContentWrapper>
      </StyledButtonToggleLabel>
    </StyledButtonToggle>
  );
};

ButtonToggle.propTypes = {
  /** Name used on the hidden radio button. */
  name: PropTypes.string,
  /** Change handler passed in from parent. */
  onChange: PropTypes.func,
  /** buttonIcon the to render. */
  buttonIcon: PropTypes.string,
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize: PropTypes.string,
  /** Sets the size of the button (padding, font-size). Only used in Classic theme. */
  size: PropTypes.string,
  /** Remove spacing from between buttons. */
  grouped: PropTypes.bool,
  /** Disable all user interaction. */
  disabled: PropTypes.bool,
  /** A required prop. This is the button text. */
  children: PropTypes.node.isRequired
};

ButtonToggle.defaultProps = {
  size: 'large'
};

export default ButtonToggle;
