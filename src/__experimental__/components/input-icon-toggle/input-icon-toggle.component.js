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
  if (disabled || readOnly || hasFailedValidation(props)) return null;

  return (
    <InputIconToggleStyle key='label-icon' { ...props }>
      { children || <Icon type={ props.type } /> }
    </InputIconToggleStyle>
  );
};

function hasFailedValidation({ hasError, hasWarning, hasInfo }) {
  return hasError || hasWarning || hasInfo;
}

InputIconToggle.propTypes = {
  children: PropTypes.node, // can override the icon
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string
};

export default InputIconToggle;
