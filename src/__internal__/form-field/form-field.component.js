import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import FormFieldStyle, { FieldLineStyle } from "./form-field.style";
import Label from "../label";
import FieldHelp from "../field-help";
import tagComponent from "../utils/helpers/tags/tags";
import { TabContext } from "../../components/tabs/tab";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const FormField = ({
  children,
  disabled,
  fieldHelp: fieldHelpContent,
  fieldHelpInline,
  error,
  warning,
  info,
  helpId,
  fieldHelpId,
  helpTabIndex,
  label,
  labelId,
  labelAlign,
  labelHelp,
  labelHelpIcon,
  labelInline,
  labelSpacing = 2,
  labelWidth,
  id,
  reverse,
  isOptional,
  useValidationIcon,
  adaptiveLabelBreakpoint,
  isRequired,
  ...rest
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

  const marginProps = filterStyledSystemMarginProps(rest);

  const fieldHelp = fieldHelpContent ? (
    <FieldHelp
      labelInline={inlineLabel}
      labelWidth={labelWidth}
      id={fieldHelpId}
    >
      {fieldHelpContent}
    </FieldHelp>
  ) : null;

  return (
    <FormFieldStyle
      {...tagComponent(rest["data-component"], rest)}
      {...marginProps}
    >
      <FieldLineStyle inline={inlineLabel}>
        {reverse && children}

        {label && (
          <Label
            labelId={labelId}
            align={labelAlign}
            disabled={disabled}
            error={error}
            warning={warning}
            info={info}
            help={labelHelp}
            helpId={helpId}
            helpTabIndex={helpTabIndex}
            htmlFor={id}
            helpIcon={labelHelpIcon}
            inline={inlineLabel}
            width={labelWidth}
            optional={isOptional}
            useValidationIcon={useValidationIcon}
            pr={!reverse ? labelSpacing : undefined}
            pl={reverse ? labelSpacing : undefined}
            isRequired={isRequired}
          >
            {label}
          </Label>
        )}

        {fieldHelpInline && fieldHelp}

        {!reverse && children}
      </FieldLineStyle>

      {!fieldHelpInline && fieldHelp}
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
  /** Styled system margin props */
  ...marginPropTypes,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  "data-component": PropTypes.string,
  "data-role": PropTypes.string,
  "data-element": PropTypes.string,
  fieldHelp: PropTypes.node,
  fieldHelpInline: PropTypes.bool,
  error: errorPropType,
  warning: errorPropType,
  info: errorPropType,
  helpId: PropTypes.string,
  fieldHelpId: PropTypes.string,
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string.isRequired,
  isOptional: PropTypes.bool,
  label: PropTypes.node,
  labelId: PropTypes.string,
  labelAlign: PropTypes.oneOf(["left", "right"]),
  labelHelp: PropTypes.node,
  labelHelpIcon: PropTypes.string,
  labelInline: PropTypes.bool,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  labelWidth: PropTypes.number,
  reverse: PropTypes.bool,
  useValidationIcon: PropTypes.bool,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  isRequired: PropTypes.bool,
};

export default FormField;
