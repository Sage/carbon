import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import FormFieldStyle, { FieldLineStyle } from "./form-field.style";
import Label from "../label";
import FieldHelp from "../field-help";
import OptionsHelper from "../../../utils/helpers/options-helper";
import tagComponent from "../../../utils/helpers/tags";
import { TabContext } from "../../../components/tabs/tab";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";

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
  size = "medium",
  childOfForm,
  isOptional,
  readOnly,
  useValidationIcon,
  adaptiveLabelBreakpoint,
  isRequired,
  ...props
}) => {
  const context = useContext(TabContext);
  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  let inlineLabel = labelInline;
  if (adaptiveLabelBreakpoint) {
    inlineLabel = largeScreen;
  }

  useEffect(() => {
    if (context && context.setError && context.setWarning && context.setInfo) {
      context.setError(id, !!error);
      context.setWarning(id, !!warning);
      context.setInfo(id, !!info);
    }
  }, [id, context, error, warning, info]);

  // Conditionally add the spacing props, we can't spread ...rest because some of the parent components
  // incorrectly pass props that are consumed in other components.
  //
  // The styled-system/space props need to be conditional, a undefined value is still considered a value and affects the
  // the behaviour
  //
  // FIXME FE-3370
  const spacingProps = [
    "m",
    "margin",
    "ml",
    "marginLeft",
    "mr",
    "marginRight",
    "mt",
    "marginTop",
    "mb",
    "marginBottom",
    "mx",
    "marginLeft",
    "mx",
    "marginRight",
    "my",
    "marginTop",
    "my",
    "marginBottom",
    "p",
    "padding",
    "pl",
    "paddingLeft",
    "pr",
    "paddingRight",
    "pt",
    "paddingTop",
    "pb",
    "paddingBottom",
    "px",
    "paddingLeft",
    "px",
    "paddingRight",
    "py",
    "paddingTop",
    "py",
    "paddingBottom",
  ].reduce((prev, curr) => {
    if (Object.prototype.hasOwnProperty.call(props, curr)) {
      prev[curr] = props[curr];
    }
    return prev;
  }, {});

  return (
    <FormFieldStyle
      {...tagComponent(props["data-component"], props)}
      {...spacingProps}
    >
      <FieldLineStyle inline={inlineLabel}>
        {reverse && children}

        {label && (
          <Label
            labelId={labelId}
            align={labelAlign}
            disabled={disabled}
            readOnly={readOnly}
            error={error}
            warning={warning}
            info={info}
            help={labelHelp}
            helpId={helpId}
            helpTag={helpTag}
            helpTabIndex={helpTabIndex}
            htmlFor={id}
            helpIcon={labelHelpIcon}
            inline={inlineLabel}
            inputSize={size}
            width={labelWidth}
            childOfForm={childOfForm}
            optional={isOptional}
            useValidationIcon={useValidationIcon}
            pr={!reverse ? labelSpacing : undefined}
            pl={reverse ? labelSpacing : undefined}
            isRequired={isRequired}
          >
            {label}
          </Label>
        )}

        {fieldHelp && fieldHelpInline && (
          <FieldHelp labelInline={inlineLabel} labelWidth={labelWidth}>
            {fieldHelp}
          </FieldHelp>
        )}

        {!reverse && children}
      </FieldLineStyle>

      {fieldHelp && !fieldHelpInline && (
        <FieldHelp labelInline={inlineLabel} labelWidth={labelWidth}>
          {fieldHelp}
        </FieldHelp>
      )}
    </FormFieldStyle>
  );
};

const errorPropType = (props, propName, componentName, ...rest) => {
  if (props[propName] && props.disabled) {
    return new Error(
      `Prop \`${propName}\` cannot be used in conjunction with \`disabled\`. ` +
        "Use `readOnly` if you require users to see validations with a non-interactive field"
    );
  }

  return PropTypes.oneOfType([PropTypes.bool, PropTypes.string])(
    props,
    propName,
    componentName,
    ...rest
  );
};

FormField.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  children: PropTypes.node,
  childOfForm: PropTypes.bool,
  disabled: PropTypes.bool,
  "data-component": PropTypes.string,
  fieldHelp: PropTypes.node,
  fieldHelpInline: PropTypes.bool,
  error: errorPropType,
  warning: errorPropType,
  info: errorPropType,
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
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  isRequired: PropTypes.bool,
};

export default FormField;
