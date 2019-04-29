import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';

const InputIconToggle = ({
  children,
  disabled,
  readOnly,
  ...props
}) => {
  if (disabled || readOnly) return null;

  return (
    <InputIconToggleStyle key='label-icon' { ...props }>
      { children || <Icon type={ props.type } /> }
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
