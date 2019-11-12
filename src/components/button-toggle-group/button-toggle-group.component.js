import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../../__experimental__/components/form-field';
import ButtonToggleGroupStyle from './button-toggle-group.style';
import withValidations from '../validations/with-validation.hoc';
import RadioButtonMapper from '../../__experimental__/components/radio-button/radio-button-mapper.component';

const BaseButtonToggleGroup = ((props) => {
  const {
    name,
    inputWidth,
    errorMessage,
    label,
    onChange,
    onBlur,
    children,
    value
  } = props;

  return (
    <FormField { ...props }>
      <ButtonToggleGroupStyle
        data-component='button-toggle-group'
        aria-label={ label }
        role='group'
        inputWidth={ inputWidth }
        errorMessage={ errorMessage }
      >
        <RadioButtonMapper
          name={ name }
          onBlur={ onBlur }
          onChange={ onChange }
          value={ value }
        >
          {children}
        </RadioButtonMapper>
      </ButtonToggleGroupStyle>
    </FormField>
  );
});

BaseButtonToggleGroup.propTypes = {
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** Children to be rendered (ButtonToggle). */
  children: PropTypes.node.isRequired,
  /** Message displayed on error */
  errorMessage: PropTypes.string,
  /** Text for the label. */
  label: PropTypes.string,
  /** Text for the labels help tooltip. */
  labelHelp: PropTypes.string,
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth: PropTypes.number,
  /** The text for the field help. */
  fieldHelp: PropTypes.string,
  /** Sets the field help to inline. */
  fieldHelpInline: PropTypes.bool,
  /** Sets the label to be inline. */
  labelInline: PropTypes.bool,
  /** The percentage width of the label. */
  labelWidth: PropTypes.number,
  /** The alignment for the text in the label. */
  labelAlign: PropTypes.string,
  /** callback to handle change event */
  onChange: PropTypes.func,
  /** Callback fired when each RadioButton is blurred */
  onBlur: PropTypes.func,
  /** The value of the Button Toggle Group */
  value: PropTypes.string
};

BaseButtonToggleGroup.displayName = 'BaseButtonToggleGroup';

export default withValidations(BaseButtonToggleGroup);
