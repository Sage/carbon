import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';
import OptionsHelper from '../../../utils/helpers/options-helper';
import ValidationIcon from '../../../components/validations/validation-icon.component';

const InputIconToggle = ({
  children,
  disabled,
  readOnly,
  size,
  inputIcon: type,
  tooltipMessage,
  onClick,
  ...props
}) => {
  if (disabled || readOnly) return null;

  if (hasFailedValidation(props)) {
    return (
      <ValidationIcon
        type={ type }
        tooltipMessage={ tooltipMessage }
        size={ size }
        isPartOfInput
        onClick={ onClick }
      />
    );
  }

  return (
    <InputIconToggleStyle
      key='label-icon'
      type={ type }
      size={ size }
      onClick={ onClick }
    >
      { children || <Icon type={ type } /> }
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
  onClick: PropTypes.func,
  inputIcon: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  tooltipMessage: PropTypes.string
};

export default InputIconToggle;
