import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';

const InputIconToggle = ({
  children,
  disabled,
  readOnly,
  ...props
}) => {
  if (disabled || readOnly) return null;

  if (hasFailedValidation(props)) {
    return <ValidationIcon type={ props.type } tooltipMessage={ props.tooltipMessage } />;
  }

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
  type: PropTypes.string,
  tooltipMessage: PropTypes.string
};

export default InputIconToggle;
