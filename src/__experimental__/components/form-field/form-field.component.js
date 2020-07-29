import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle, { FieldLineStyle } from './form-field.style';
import Label from '../label';
import FieldHelp from '../field-help';
import OptionsHelper from '../../../utils/helpers/options-helper';
import tagComponent from '../../../utils/helpers/tags';
import Logger from '../../../utils/logger/logger';
import { TabContext } from '../../../components/tabs/__internal__/tab';

let deprecatedWarnTriggered = false;

const FormField = ({
  children,
  disabled,
  fieldHelp,
  fieldHelpInline,
  error,
  warning,
  info,
  helpId,
  helpTag,
  helpTabIndex,
  label,
  labelId,
  labelAlign,
  labelHelp,
  labelHelpIcon,
  labelInline,
  labelSpacing = 2,
  labelWidth,
  name,
  id,
  reverse,
  size,
  childOfForm,
  isOptional,
  readOnly,
  useValidationIcon,
  marginBottom,
  styleOverride,
  ...props
}) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate('`styleOverride` that is used in the `FormField` component is deprecated and will soon be removed.');
  }

  const context = useContext(TabContext);

  useEffect(() => {
    if (context && context.setError && context.setWarning) {
      context.setError(id, !!error);
      context.setWarning(id, !!warning);
    }
  }, [id, context, error, warning]);

  return (
    <FormFieldStyle
      { ...tagComponent(props['data-component'], props) }
      styleOverride={ styleOverride.root }
      marginBottom={ marginBottom }
    >
      <FieldLineStyle inline={ labelInline }>
        {reverse && children}

        {label && (
          <Label
            labelId={ labelId }
            align={ labelAlign }
            disabled={ disabled }
            readOnly={ readOnly }
            error={ error }
            warning={ warning }
            info={ info }
            help={ labelHelp }
            helpId={ helpId }
            helpTag={ helpTag }
            helpTabIndex={ helpTabIndex }
            htmlFor={ id }
            helpIcon={ labelHelpIcon }
            inline={ labelInline }
            inputSize={ size }
            width={ labelWidth }
            childOfForm={ childOfForm }
            optional={ isOptional }
            useValidationIcon={ useValidationIcon }
            rightSpacing={ labelSpacing }
            styleOverride={ styleOverride.label }
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
      </FieldLineStyle>

      {fieldHelp && !fieldHelpInline && (
        <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
          {fieldHelp}
        </FieldHelp>
      )}
    </FormFieldStyle>
  );
};

FormField.defaultProps = {
  size: 'medium',
  styleOverride: {}
};

FormField.propTypes = {
  children: PropTypes.node,
  childOfForm: PropTypes.bool,
  disabled: PropTypes.bool,
  'data-component': PropTypes.string,
  fieldHelp: PropTypes.node,
  fieldHelpInline: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  helpId: PropTypes.string,
  helpTag: PropTypes.string,
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  isOptional: PropTypes.bool,
  label: PropTypes.node,
  labelId: PropTypes.string,
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  labelHelp: PropTypes.node,
  labelHelpIcon: PropTypes.string,
  labelInline: PropTypes.bool,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  labelWidth: PropTypes.number,
  readOnly: PropTypes.bool,
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  useValidationIcon: PropTypes.bool,
  /** Override form spacing (margin bottom) */
  marginBottom: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
};

export default FormField;
