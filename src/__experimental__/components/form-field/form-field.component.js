import React from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle from './form-field.style';
import Label from '../label';
import FieldHelp from '../field-help';

/**
 * To import FormField:
 *
 *   import FormField from 'carbon-react/lib/__experimental__/components/form-field';
 *
 * To render FieldHelp:
 *
 *   <FormField label='Name'>
 *     <input />
 *   </FormField>
 */
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
      { label && (
        <Label
          align={ labelAlign }
          help={ labelHelp }
          inline={ labelInline }
          inputSize={ size }
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
};

FormField.defaultProps = {
  size: 'medium'
};

FormField.propTypes = {
  children: PropTypes.node,
  fieldHelp: PropTypes.node,
  label: PropTypes.node,
  labelAlign: PropTypes.oneOf(['left', 'right']),
  labelHelp: PropTypes.node,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default FormField;
