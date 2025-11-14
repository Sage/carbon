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
import FormFieldStyle, { FieldLineStyle, LabelField } from "./form-field.style";
import Label, { LabelProps } from "../label";
import HintText from "../../__internal__/hint-text";
import FieldHelp from "../field-help";
import tagComponent, { TagProps } from "../utils/helpers/tags/tags";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { IconType } from "../../components/icon";
import { filterStyledSystemMarginProps } from "../../style/utils";
import TabContext, {
  TabContextProps,
} from "../../components/tabs/tab/__internal__/tab.context";
import { TabsContext as NewTabsContext } from "../../components/tabs/__next__/tabs.context";
import { TabContext as NewTabContext } from "../../components/tabs/__next__/tab.context";
import type {
  TabContextProps as NewTabContextProps,
  TabsContextProps as NewTabsContextProps,
} from "../../components/tabs/__next__/tabs.types";

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
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** The unique identifier for the hint element. Useful for accessibility (e.g., connecting via aria-describedby). */
  inputHintId?: string;
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
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** Whether to show the validation icon */
  useValidationIcon?: boolean;
  /** String value for max-width of `field-line` element */
  maxWidth?: string;
  /** @private @internal @ignore */
  "data-component"?: string;
  size?: "small" | "medium" | "large";
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
  inputHint,
  inputHintId,
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
  useValidationIcon,
  adaptiveLabelBreakpoint,
  isRequired,
  validationIconId,
  validationRedesignOptIn,
  size,
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
  }, [error, warning, info, disabled, loading]);

  invariant(
    invalidValidationProp === undefined,
    `Prop \`${invalidValidationProp}\` cannot be used in conjunction with \`disabled\`. ` +
      "Use `readOnly` if you require users to see validations with a non-interactive field",
  );

  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  let inlineLabel = labelInline;
  if (adaptiveLabelBreakpoint) {
    inlineLabel = largeScreen;
  }

  const { setErrors, setWarnings, setInfos } =
    useContext<NewTabsContextProps>(NewTabsContext);
  const { tabId } = useContext<NewTabContextProps>(NewTabContext);

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

  /* istanbul ignore next */
  useEffect(() => {
    if (setErrors) setErrors(id, tabId || "", error || false);
    if (setWarnings) setWarnings(id, tabId || "", warning || false);
    if (setInfos) setInfos(id, tabId || "", info || false);

    return () => {
      if (!isMounted.current) {
        if (setErrors) setErrors(id, tabId || "", false);
        if (setWarnings) setWarnings(id, tabId || "", false);
        if (setInfos) setInfos(id, tabId || "", false);
      }
    };
  }, [id, setErrors, setWarnings, error, warning, info, tabId, setInfos]);

  // This useEffect handles support for the old Tab instances and can be removed in favour of the above once
  // the legacy work in Tabs is removed
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

  const computedLabelWidth = labelWidth;

  const labelProps = {
    labelId,
    align: labelAlign,
    disabled,
    error: !validationRedesignOptIn && error,
    warning: !validationRedesignOptIn && warning,
    info: !validationRedesignOptIn && info,
    help: labelHelp,
    tooltipId,
    htmlFor: id,
    helpIcon: labelHelpIcon,
    inline: inlineLabel,
    width: computedLabelWidth,
    useValidationIcon,
    pr: !reverse && !inlineLabel ? labelSpacing : undefined,
    pl: reverse && !inlineLabel ? labelSpacing : undefined,
    isRequired,
    validationIconId,
    as: labelAs,
  };

  return (
    <FormFieldStyle {...tagComponent(dataComponent, rest)} {...marginProps}>
      <FieldLineStyle
        data-role="field-line"
        inline={inlineLabel}
        maxWidth={maxWidth}
        labelInline={labelInline}
        size={size}
      >
        {reverse && children}

        <LabelField
          labelInline={labelInline}
          width={computedLabelWidth}
          isLarge={size === "large"}
        >
          <Label {...labelProps}>{label}</Label>
          {inputHint && (
            <HintText
              marginBottom="0"
              data-element="input-hint"
              id={inputHintId}
            >
              {inputHint}
            </HintText>
          )}
        </LabelField>

        {fieldHelpInline && fieldHelp}

        {!reverse && children}
      </FieldLineStyle>

      {!fieldHelpInline && fieldHelp}
    </FormFieldStyle>
  );
};
FormField.displayName = "FormField";

export default FormField;
