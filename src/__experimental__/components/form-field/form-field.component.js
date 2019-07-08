import React from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle from './form-field.style';
import Label from '../label';
import FieldHelp from '../field-help';
import OptionsHelper from '../../../utils/helpers/options-helper';

const FormField = ({
  children,
  disabled,
  fieldHelp,
  fieldHelpInline,
  label,
  labelAlign,
  labelHelp,
  labelHelpIcon,
  labelInline,
  labelWidth,
  name,
  reverse,
  size
}) => (
  <FormFieldStyle inline={ labelInline }>
    {reverse && children}

    {label && (
      <Label
        align={ labelAlign }
        disabled={ disabled }
        help={ labelHelp }
        htmlFor={ name }
        helpIcon={ labelHelpIcon }
        inline={ labelInline }
        inputSize={ size }
        width={ labelWidth }
      >
        {label}
      </Label>
    )}

    {fieldHelp && fieldHelpInline && (
      <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
        {fieldHelp}
      </FieldHelp>
    )}

    {!reverse && children}

    {fieldHelp && !fieldHelpInline && (
      <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
        {fieldHelp}
      </FieldHelp>
    )}
  </FormFieldStyle>
);

FormField.defaultProps = {
  size: 'medium'
};

FormField.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fieldHelp: PropTypes.node,
  fieldHelpInline: PropTypes.bool,
  label: PropTypes.node,
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  labelHelp: PropTypes.node,
  labelHelpIcon: PropTypes.string,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  name: PropTypes.string,
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

export default FormField;
