import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';

const InputIconToggle = ({
  type,
  children,
  disabled,
  readOnly,
  ...props
}) => {
  if (disabled || readOnly) return null;

  return (
    <InputIconToggleStyle type={ type } { ...props }>
      { children || <Icon type={ type } /> }
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
