import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle from './form-field.style';
import Label from '../label';
import FieldHelp from '../field-help';
import OptionsHelper from '../../../utils/helpers/options-helper';

const FormFieldContext = React.createContext();

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
  const [hasHover, setHasHover] = useState(false),
      [hasFocus, setHasFocus] = useState(false);

  const contextForFormField = () => {
    return {
      hasFocus,
      hasHover,
      onFocus: () => setHasFocus(true),
      onBlur: () => setHasFocus(false),
      onMouseOver: () => setHasHover(true),
      onMouseOut: () => setHasHover(false)
    };
  };

  return (
    <FormFieldStyle>
      <FormFieldContext.Provider value={ contextForFormField() }>
        {label && (
          <Label
            align={ labelAlign }
            help={ labelHelp }
            inline={ labelInline }
            inputSize={ size }
            labelWidth={ labelWidth }
          >
            {label}
          </Label>
        )}

        {children}

        {fieldHelp && (
          <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
            {fieldHelp}
          </FieldHelp>
        )}
      </FormFieldContext.Provider>
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
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  labelHelp: PropTypes.node,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

export { FormField, FormFieldContext };
