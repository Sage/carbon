import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import RadioButtonStyle, {
  StyledAccordion,
  StyledAccordionContainer,
  StyledAccordionContent,
  AccordionVerticalLine,
} from "./radio-button.style";
import CheckableInput from "../../__internal__/checkable-input";
import RadioButtonSvg from "./radio-button-svg.component";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import CommonCheckableInput, {
  CommonCheckableInputProps,
} from "./__internal__/common-checkable-input";
import RadioButtonGroupContext from "./radio-button-group/___internal___/radio-button-group.context";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";

export interface RadioButtonProps
  extends CommonCheckableInputProps,
    MarginProps,
    TagProps {
  /** Accepts a callback function which is triggered on click event */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** the value of the Radio Button, passed on form submit */
  value: string;
  /** Size of the RadioButton */
  size?: "small" | "medium" | "large";
  /** Content to be rendered below the input when checked, cannot be used when inputs are inline */
  conditionalContent?: React.ReactNode;

  /** @deprecated Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** @deprecated Aria label for rendered help component */
  helpAriaLabel?: string;
  /** @deprecated When true, displays validation icon on label */
  validationOnLabel?: boolean;
  /** @deprecated Id of the validation icon */
  validationIconId?: string;
  /** @deprecated Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /**
   * @deprecated
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   */
  fieldHelpInline?: boolean;
  /** @deprecated The content for the help tooltip, to appear next to the Label */
  labelHelp?: React.ReactNode;
  /** @deprecated Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** @deprecated Label width */
  labelWidth?: number;
  /** @deprecated Sets percentage-based input width */
  inputWidth?: number;
  /** @deprecated Indicate that error has occurred. */
  error?: boolean | string;
  /** @deprecated Indicate additional information. */
  info?: boolean | string;
  /** @deprecated Indicate that warning has occurred. */
  warning?: boolean | string;
  /** @deprecated If true, the label switches position with the input */
  reverse?: boolean;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      autoFocus,
      checked,
      disabled,
      fieldHelp,
      fieldHelpInline,
      id,
      inputWidth,
      label,
      labelHelp,
      labelSpacing = 1,
      labelWidth,
      name,
      onChange,
      onBlur,
      onFocus,
      value,
      reverse = false,
      size = "small",
      error,
      warning,
      info,
      tooltipPosition,
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      conditionalContent,
      ...props
    }: RadioButtonProps,
    ref,
  ) => {
    const { validationRedesignOptIn } = useContext(NewValidationContext);
    const marginProps = filterStyledSystemMarginProps(props);
    const {
      error: contextError,
      warning: contextWarning,
      inline,
      onBlur: contextOnBlur,
      onChange: contextOnChange,
      value: contextValue,
      name: contextName,
    } = useContext(RadioButtonGroupContext);

    const accordionContainer = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<string | number>(0);
    const isChecked = contextValue === value;

    useResizeObserver(accordionContainer, () => {
      setContentHeight(accordionContainer.current?.scrollHeight as number);
    });

    useEffect(() => {
      setContentHeight(accordionContainer.current?.scrollHeight as number);
    }, [isChecked]);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        /* istanbul ignore else */
        if (onChange) {
          onChange(event);
        }

        if (contextOnChange) {
          contextOnChange(event);
        }

        // trigger focus, as Safari doesn't focus radioButtons on click by default
        event.target.focus();
      },
      [onChange, contextOnChange],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
          onBlur(event);
        }
        if (contextOnBlur) {
          contextOnBlur(event);
        }
      },
      [onBlur, contextOnBlur],
    );

    const validationProps = {
      error,
      warning,
      info,
    };

    const commonProps = {
      ...validationProps,
      disabled,
      inputWidth,
      fieldHelpInline,
      labelSpacing,
    };

    const inputProps = {
      ...commonProps,
      autoFocus,
      checked,
      fieldHelp,
      name,
      onChange: handleChange,
      onBlur,
      onFocus,
      labelInline: true,
      labelWidth,
      label,
      labelHelp,
      id,
      value,
      type: "radio",
      /**
       * Invert the reverse prop, to ensure the FormField component renders the components
       * in the desired order (other elements which use FormField render their sub-components the
       * opposite way around by default)
       */
      reverse: !reverse,
      ref,
      ...props,
      "data-component": undefined,
    };

    invariant(
      !props.children,
      "This component is meant to be used as a self-closing tag. " +
        "You should probably use the label prop instead.",
    );

    if (validationRedesignOptIn) {
      return (
        <RadioButtonStyle
          applyNewValidation={true}
          reverse={reverse}
          size={size}
          error={error || contextError}
          warning={warning || contextWarning}
          disabled={disabled}
          {...marginProps}
          {...tagComponent("radio-button", {
            "data-element": dataElement,
            "data-role": dataRole,
          })}
        >
          <CommonCheckableInput
            type="radio"
            id={id}
            name={name || contextName}
            value={value}
            label={label}
            disabled={disabled}
            checked={isChecked}
            reverse={!reverse}
            ref={ref}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={onFocus}
            {...props}
          >
            <RadioButtonSvg />
          </CommonCheckableInput>

          {/* This could be rendered in CommonCheckableInput, needed for Checkbox too */}
          {!inline && conditionalContent && (
            <StyledAccordion
              ref={accordionContainer}
              expanded={isChecked}
              contentHeight={contentHeight}
            >
              <StyledAccordionContainer>
                <AccordionVerticalLine size={size} />
                <StyledAccordionContent size={size}>
                  {conditionalContent}
                </StyledAccordionContent>
              </StyledAccordionContainer>
            </StyledAccordion>
          )}
        </RadioButtonStyle>
      );
    }

    return (
      <TooltipProvider
        helpAriaLabel={helpAriaLabel}
        tooltipPosition={tooltipPosition}
      >
        <RadioButtonStyle
          applyNewValidation={false}
          reverse={reverse}
          size={size}
          {...commonProps}
          {...marginProps}
          {...tagComponent("radio-button", {
            "data-element": dataElement,
            "data-role": dataRole,
          })}
        >
          <CheckableInput {...inputProps}>
            <RadioButtonSvg />
          </CheckableInput>
        </RadioButtonStyle>
      </TooltipProvider>
    );
  },
);

RadioButton.displayName = "RadioButton";

export default React.memo(RadioButton);
