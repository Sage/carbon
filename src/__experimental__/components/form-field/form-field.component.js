import React from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle from './form-field.style';
import Label from '../label';
import FieldHelp from '../form-field-help';

const FormField = ({
  children,
  fieldHelp,
  label,
  labelAlign,
  labelHelp,
  labelInline,
  labelWidth,
  size
}) => {
  return (
    <FormFieldStyle>
      <Label
        align={ labelAlign }
        help={ labelHelp }
        inline={ labelInline }
        inputSize={ size }
      >
        { label }
      </Label>

      { children }

      <FieldHelp
        labelInline={ labelInline }
        labelWidth={ labelWidth }
      >
        { fieldHelp }
      </FieldHelp>
    </FormFieldStyle>
  );
};

FormField.propTypes = {
  children: PropTypes.node,
  fieldHelp: PropTypes.node,
  label: PropTypes.node,
  labelAlign: PropTypes.string,
  labelHelp: PropTypes.node,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  size: PropTypes.string
};

export default FormField;
