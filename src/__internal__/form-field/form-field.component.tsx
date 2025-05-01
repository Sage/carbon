import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { MarginProps } from "styled-system";
import invariant from "invariant";

import { ValidationProps } from "../validations";
import FormFieldStyle, { FieldLineStyle } from "./form-field.style";
import Label, { LabelProps } from "../label";
import FieldHelp from "../field-help";
import tagComponent, { TagProps } from "../utils/helpers/tags/tags";
import TabContext, {
  TabContextProps,
} from "../../components/tabs/tab/__internal__/tab.context";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { IconType } from "../../components/icon";
import { filterStyledSystemMarginProps } from "../../style/utils";

interface CommonFormFieldProps extends MarginProps, ValidationProps {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** @private @ignore */
  loading?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** The unique id of the Help component tooltip, used for accessibility */
  tooltipId?: string;
  /** The unique id of the FieldHelp component */
  fieldHelpId?: string;
  /** Label content */
  label?: React.ReactNode;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** Help Icon type */
  labelHelpIcon?: IconType;
  /** The unique id of the label element */
  labelId?: string;
  /** When true label is inline */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /* To use a different HTML element other than <label> */
  labelAs?: LabelProps["as"];
  /** If true the label switches position with the input */
  reverse?: boolean;
  /** Id of the validation icon */
  validationIconId?: string;
  /**
   * @private @ignore
   * Flag dedicating if latest validation design should be used */
  validationRedesignOptIn?: boolean;
}

export interface FormFieldProps extends CommonFormFieldProps, TagProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Content to be rendered inside the FormField */
  children?: React.ReactNode;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   */
  fieldHelpInline?: boolean;
  /** Id of the element a label should be bound to */
  id: string;
  /**
   * [Legacy] Flag to configure component as optional.
   * @deprecated If the value of this component is not required, use the `isRequired` prop and set it to false instead.
   */
  isOptional?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** Whether to show the validation icon */
  useValidationIcon?: boolean;
  /** String value for max-width of `field-line` element */
  maxWidth?: string;
  /** @private @internal @ignore */
  "data-component"?: string;
}

const FormField = ({
  maxWidth,
  children,
  "data-component": dataComponent,
  disabled,
  loading,
  fieldHelp: fieldHelpContent,
  fieldHelpInline,
  error,
  warning,
  info,
  tooltipId,
  fieldHelpId,
  label,
  labelId,
  labelAlign,
  labelHelp,
  labelHelpIcon,
  labelInline,
  labelSpacing = 2,
  labelWidth,
  labelAs,
  id,
  reverse,
  isOptional,
  useValidationIcon,
  adaptiveLabelBreakpoint,
  isRequired,
  validationIconId,
  validationRedesignOptIn,
  ...rest
}: FormFieldProps) => {
  const invalidValidationProp: string | undefined = useMemo(() => {
    const validationProps: Record<string, boolean> = {
      error: !!error,
      warning: !!warning,
      info: !!info,
    };

    if (!(disabled && !loading)) return undefined;

    return Object.keys(validationProps).find(
      (propName) => validationProps[propName],
    );
  }, [error, warning, info, disabled]);

  invariant(
    invalidValidationProp === undefined,
    `Prop \`${invalidValidationProp}\` cannot be used in conjunction with \`disabled\`. ` +
      "Use `readOnly` if you require users to see validations with a non-interactive field",
  );

  invariant(
    !(isRequired && isOptional),
    "an input cannot be set to both required and optional at the same time",
  );

  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  let inlineLabel = labelInline;
  if (adaptiveLabelBreakpoint) {
    inlineLabel = largeScreen;
  }

  const { setError, setWarning, setInfo } =
    useContext<TabContextProps>(TabContext);
  const marginProps = filterStyledSystemMarginProps(rest);
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (setError) setError(id, error);
    if (setWarning) setWarning(id, warning);
    if (setInfo) setInfo(id, info);

    return () => {
      if (!isMounted.current) {
        if (setError && error) setError(id, false);
        if (setWarning && warning) setWarning(id, false);
        if (setInfo && info) setInfo(id, false);
      }
    };
  }, [id, setError, setWarning, setInfo, error, warning, info]);

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
    <FormFieldStyle {...tagComponent(dataComponent, rest)} {...marginProps}>
      <FieldLineStyle
        data-role="field-line"
        inline={inlineLabel}
        maxWidth={maxWidth}
      >
        {reverse && children}

        {label && (
          <Label
            labelId={labelId}
            align={labelAlign}
            disabled={disabled}
            error={!validationRedesignOptIn && error}
            warning={!validationRedesignOptIn && warning}
            info={!validationRedesignOptIn && info}
            help={labelHelp}
            tooltipId={tooltipId}
            htmlFor={id}
            helpIcon={labelHelpIcon}
            inline={inlineLabel}
            width={labelWidth}
            optional={isOptional}
            useValidationIcon={useValidationIcon}
            pr={!reverse ? labelSpacing : undefined}
            pl={reverse ? labelSpacing : undefined}
            isRequired={isRequired}
            validationIconId={validationIconId}
            as={labelAs}
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
FormField.displayName = "FormField";

export default FormField;
