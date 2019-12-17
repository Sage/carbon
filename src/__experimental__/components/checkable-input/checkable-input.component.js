import React from 'react';
import PropTypes from 'prop-types';
import { validProps } from '../../../utils/ether';
import { StyledCheckableInput, StyledCheckableInputWrapper } from './checkable-input.style';
import FormField from '../form-field';
import HiddenCheckableInput from './hidden-checkable-input.component';
import guid from '../../../utils/helpers/guid';

class CheckableInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputId = props.inputId || guid();
  }

  render() {
    const {
      children, onChange, onBlur, ...rest
    } = this.props;
    const id = this.inputId;
    const labelId = `${id}-label`;
    const helpId = `${id}-help`;

    const formFieldProps = {
      ...validProps(this, ['fieldHelp', 'fieldHelpInline', 'labelHelp', 'reverse']),
      labelId,
      helpId,
      label: rest.inputLabel,
      labelHelpIcon: 'info',
      name: id
    };

    const {
      fieldHelp, labelHelp, ...inputProps
    } = {
      ...validProps(this, ['checked', 'disabled', 'inputType', 'onChange', 'onBlur', 'tabindex']),
      labelId,
      helpId,
      id
    };

    return (
      <StyledCheckableInputWrapper { ...rest }>
        <FormField { ...formFieldProps }>
          <StyledCheckableInput>
            <HiddenCheckableInput { ...inputProps } />
            {children}
          </StyledCheckableInput>
        </FormField>
      </StyledCheckableInputWrapper>
    );
  }
}

CheckableInput.propTypes = {
  /** Set the value of the CheckableInput */
  checked: PropTypes.bool,
  /** Used to set the visible aspect of the input (i.e. the checkbox sprite, input slider etc) */
  children: PropTypes.node,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** Toggles error styles */
  error: PropTypes.bool,
  /** The fieldHelp content to display for the input */
  fieldHelp: PropTypes.node,
  /** Displays fieldHelp inline with the CheckableInput */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  inputId: PropTypes.string,
  /** The content for the Label to apply to the input */
  inputLabel: PropTypes.node,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** The content for the help tooltip, to appear next to the Label */
  labelHelp: PropTypes.node,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and CheckableInput display */
  reverse: PropTypes.bool,
  /** Specifies input type, 'checkbox' or 'switch' */
  inputType: PropTypes.string.isRequired
};

CheckableInput.defaultProps = {
  reverse: false
};

export default CheckableInput;
