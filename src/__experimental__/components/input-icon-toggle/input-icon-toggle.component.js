import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import InputIconToggleStyle from './input-icon-toggle.style';

/**
 * To import InputIconToggle:
 *
 *   import InputIconToggle from 'carbon-react/lib/components/input-icon-toggle';
 *
 * To render InputIconToggle:
 *
 *   <InputIconToggle type='dropdown' />
 */
const InputIconToggle = ({
  type,
  children,
  disabled,
  readOnly,
  ...props
}) => {
  if (disabled || readOnly) return null;

  return (
    <InputIconToggleStyle key='label-icon' { ...props }>
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
