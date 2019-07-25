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

  formFieldProps = () => {
    return {
      ...validProps(this, ['fieldHelpInline', 'reverse']),
      labelHelpIcon: 'info',
      name: this.inputId
    };
  }

  inputProps = () => {
    const {
      children, fieldHelp, labelHelp, ...inputProps
    } = {
      ...validProps(this, ['checked', 'disabled', 'onChange', 'tabindex', 'type']),
      id: this.inputId
    };

    return inputProps;
  };

  render() {
    const { onChange, ...rest } = this.props;

    return (
      <StyledCheckableInputWrapper { ...rest }>
        <FormField { ...this.formFieldProps() }>
          <StyledCheckableInput>
            <HiddenCheckableInput { ...this.inputProps() } />
            {this.props.children}
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
  /** Displays fieldHelp inline with the CheckableInput */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  inputId: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Reverses label and CheckableInput display */
  reverse: PropTypes.bool,
  /** Specifies input type, 'checkbox' or 'switch' */
  type: PropTypes.string.isRequired
};

CheckableInput.defaultProps = {
  reverse: false
};

export default CheckableInput;
