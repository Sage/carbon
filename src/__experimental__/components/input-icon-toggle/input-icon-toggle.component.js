import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import extractProps from '../../../utils/helpers/extract-props';

const InputIconToggle = ({
  children,
  disabled,
  readOnly,
  ...props
}) => {
  const styleProps = extractProps(props, InputIconToggleStyle);

  if (disabled || readOnly) return null;

  if (hasFailedValidation(props)) {
    return <ValidationIcon type={ props.inputIcon } tooltipMessage={ props.tooltipMessage } />;
  }

  return (
    <InputIconToggleStyle key='label-icon' { ...styleProps }>
      { children || <Icon type={ props.inputIcon } /> }
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
  inputIcon: PropTypes.string,
  tooltipMessage: PropTypes.string
};

export default InputIconToggle;
