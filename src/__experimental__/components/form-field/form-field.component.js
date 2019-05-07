import React from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle from './form-field.style';
import Label from '../label';
import FieldHelp from '../field-help';
import OptionsHelper from '../../../utils/helpers/options-helper';

const FormField = ({
  children,
  fieldHelp,
  label,
  labelAlign,
  labelHelp,
  labelInline,
  labelWidth,
  name,
  size
}) => (
  <FormFieldStyle inline={ labelInline }>
    { label && (
      <Label
        align={ labelAlign }
        help={ labelHelp }
        htmlFor={ name }
        inline={ labelInline }
        inputSize={ size }
        width={ labelWidth }
      >
        { label }
      </Label>
    ) }

    { children }

    { fieldHelp && (
      <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
        { fieldHelp }
      </FieldHelp>
    ) }
  </FormFieldStyle>
);

FormField.defaultProps = {
  size: 'medium'
};

FormField.propTypes = {
  children: PropTypes.node,
  fieldHelp: PropTypes.node,
  label: PropTypes.node,
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  labelHelp: PropTypes.node,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  name: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

export default FormField;
