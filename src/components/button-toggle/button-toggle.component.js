import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleContentWrapper
} from './button-toggle.style';
import guid from '../../utils/helpers/guid';
import ButtonToggleIcon from './button-toggle-icon.component';
import ButtonToggleInput from './button-toggle-input.component';

const ButtonToggle = (props) => {
  const inputGuid = guid();
  const icon = props.buttonIcon ? <ButtonToggleIcon { ...props } /> : null;

  return (
    <StyledButtonToggle { ...props }>
      <ButtonToggleInput
        name={ props.name }
        disabled={ props.disabled }
        guid={ inputGuid }
      />
      <StyledButtonToggleLabel
        { ...props } htmlFor={ inputGuid }
      >
        <StyledButtonToggleContentWrapper>
          { icon }
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
  /** buttonIcon to render. */
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
