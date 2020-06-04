import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';
import OptionsHelper from '../../../utils/helpers/options-helper';
import ValidationIcon from '../../../components/validations/validation-icon.component';

const shouldDisplayValidationIcon = ({ error, warning, info }) => {
  const validation = error || warning || info;
  return typeof validation === 'string';
};

const InputIconToggle = ({
  disabled,
  readOnly,
  size,
  inputIcon: type,
  onClick,
  error,
  warning,
  info,
  useValidationIcon,
  align
}) => {
  if (disabled || readOnly) return null;

  if (useValidationIcon && shouldDisplayValidationIcon({ error, warning, info })) {
    return (
      <InputIconToggleStyle size={ size }>
        <ValidationIcon
          error={ error }
          warning={ warning }
          info={ info }
          size={ size }
          onClick={ onClick }
          isPartOfInput
          tooltipPosition={ align === 'right' ? 'left' : 'right' }
        />
      </InputIconToggleStyle>
    );
  }

  if (type) {
    return (
      <InputIconToggleStyle size={ size } onClick={ onClick }>
        <Icon type={ type } />
      </InputIconToggleStyle>
    );
  }
  return null;
};

InputIconToggle.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
  inputIcon: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  align: PropTypes.oneOf(['left', 'right']),
  useValidationIcon: PropTypes.bool
};

export default InputIconToggle;
