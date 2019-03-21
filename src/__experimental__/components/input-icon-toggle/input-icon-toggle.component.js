import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';
import { InputPresentationContext } from '../input/input-presentation.component';

const InputIconToggle = ({
  type,
  children,
  disabled,
  readOnly,
  ...props
}) => {
  if (disabled || readOnly) return null;

  const inputPresentationContext = useContext(InputPresentationContext);

  const hasFocus = () => {
    if (inputPresentationContext && inputPresentationContext.hasFocus) return inputPresentationContext.hasFocus;
    return false;
  };

  const hasHover = () => {
    if (inputPresentationContext && inputPresentationContext.hasHover) return inputPresentationContext.hasHover;
    return false;
  };

  return (
    <InputIconToggleStyle
      key='label-icon'
      inputFocus={ hasFocus() }
      inputHover={ hasHover() }
      type={ type }
      { ...props }
    >
      {children || <Icon type={ type } />}
    </InputIconToggleStyle>
  );
};

InputIconToggle.propTypes = {
  children: PropTypes.node, // can override the icon
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string
};

export default InputIconToggle;
