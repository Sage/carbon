import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';
import InputIconToggle from '../input-icon-toggle';
import FormField from '../form-field';
import { withValidation, validationsPropTypes } from '../../../components/validations';
import withUniqueName from '../../../utils/helpers/with-unique-name';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textbox = ({
  children,
  inputIcon,
  leftChildren,
  formattedValue,
  value,
  ...props
}) => {
  removeParentProps(props);

  return (
    <FormField { ...props }>
      <InputPresentation type='text' { ...props }>
        { leftChildren }
        <Input
          { ...props }
          value={ visibleValue(value, formattedValue) }
        />
        { children }
        { inputIcon && <InputIconToggle { ...props } type={ inputIcon } /> }
      </InputPresentation>
    </FormField>
  );
};

function removeParentProps(props) {
  delete props['data-element'];
  delete props['data-component'];
  delete props['data-role'];
  delete props.className;
}

function visibleValue(value, formattedValue) {
  return (typeof formattedValue === 'string') ? formattedValue : value;
}

Textbox.propTypes = {
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array // Allows the textbox to be used in the Multi-Select component
  ]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  /** Event handler for the change event */
  onChange: PropTypes.func,
  /** Event handler for the keyDown event */
  onKeyDown: PropTypes.func,
  /** Defered callback called after the onChange event */
  onChangeDeferred: PropTypes.func,
  /** Integer to determine timeout for defered callback */
  deferTimeout: PropTypes.number,
  /** Label */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.string,
  /** When true, label is placed in line an input */
  labelInline: PropTypes.bool,
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth: PropTypes.number,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** Type of the icon that will be rendered next to the input */
  children: PropTypes.node,
  inputIcon: PropTypes.string,
  leftChildren: PropTypes.node,
  /** List of error validation functions */
  validations: validationsPropTypes,
  /** List of warning validation functions */
  warnings: validationsPropTypes,
  /** List of info validation functions */
  info: validationsPropTypes
};

Textbox.defaultProps = {
  labelWidth: 30,
  inputWidth: 70
};

export { Textbox as OriginalTextbox };
export default withUniqueName(withValidation(Textbox));
