import React from 'react';
import PropTypes from 'prop-types';
import { validProps } from '../../../utils/ether';
import { StyledCheckableInput, StyledCheckableInputWrapper } from './checkable-input.style';
import FormField from '../form-field';
import HiddenCheckableInput from './hidden-checkable-input.component';
import guid from '../../../utils/helpers/guid';

const CheckableInput = (props) => {
  const inputId = guid();

  const formFieldProps = {
    ...validProps({ propTypes: CheckableInput.propTypes, safeProps: ['fieldHelpInline'], props }),
    labelFor: inputId,
    labelHelpIcon: 'info',
    reverse: !props.reverse
  };

  const {
    children, fieldHelp, labelHelp, ...inputProps
  } = {
    ...validProps({ propTypes: CheckableInput.propTypes, safeProps: ['disabled', 'onChange', 'type'], props }),
    id: inputId
  };

  return (
    <StyledCheckableInputWrapper>
      <FormField { ...formFieldProps }>
        <StyledCheckableInput>
          <HiddenCheckableInput { ...inputProps } />
          {props.children}
        </StyledCheckableInput>
      </FormField>
    </StyledCheckableInputWrapper>
  );
};

CheckableInput.propTypes = {
  /** Set the value of the CheckableInput */
  checked: PropTypes.bool,
  /** Used to set the visible aspect of the input (i.e. the checkbox sprite, input slider etc) */
  children: PropTypes.node,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** Toggles error styles */
  error: PropTypes.bool,
  /** Displays fieldHelp inline with the CheckableInput */
  fieldHelpInline: PropTypes.bool,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.number,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.number,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Reverses label and CheckableInput display */
  reverse: PropTypes.bool
};

CheckableInput.defaultProps = {
  reverse: false
};

export default CheckableInput;
