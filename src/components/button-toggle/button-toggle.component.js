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
  const {
    name,
    grouped,
    children,
    disabled,
    buttonIcon,
    buttonIconSize,
    onChange,
    value,
    size
  } = props;
  const inputGuid = guid();
  let icon;

  if (buttonIcon) {
    icon = <ButtonToggleIcon buttonIcon={ buttonIcon } buttonIconSize={ buttonIconSize } />;
  }

  return (
    <StyledButtonToggle
      data-component='button-toggle' grouped={ grouped }
      onChange={ onChange }
    >
      <ButtonToggleInput
        name={ name }
        disabled={ disabled }
        guid={ inputGuid }
        value={ value }
      />
      <StyledButtonToggleLabel
        buttonIcon={ buttonIcon }
        buttonIconSize={ buttonIconSize }
        disabled={ disabled }
        htmlFor={ inputGuid }
        size={ size }
      >
        <StyledButtonToggleContentWrapper>
          { icon }
          { children }
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
  children: PropTypes.node.isRequired,
  /** Value for the input */
  value: PropTypes.string
};

ButtonToggle.defaultProps = {
  size: 'large'
};

export default ButtonToggle;
