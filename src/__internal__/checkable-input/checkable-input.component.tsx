/**
 * Checkable Input Component
 *
 * @description Base component for Checkbox and RadioButton components.
 * Do not add props that are specific to either Checkbox or RadioButton.
 * Do not add props to the common interface that are not intended to be in the public interface of both components.
 * Styles of any children should be handled in their respective component files.
 */

import React, { useRef, useState, useLayoutEffect, useContext } from "react";
import {
  StyledCheckableInput,
  StyledCheckableInputWrapper,
  StyledAccordionLine,
  StyledAccordion,
  StyledLineContainer,
  StyledAccordionContent,
} from "./checkable-input.style";
import HiddenCheckableInput, {
  CommonHiddenCheckableInputProps,
} from "./hidden-checkable-input.component";
import guid from "../utils/helpers/guid";
import Label from "../label";
import HintText from "../hint-text";
import useMediaQuery from "../../hooks/useMediaQuery";
import useRegisterValidationToTabs from "../../hooks/__internal__/useRegisterValidationToTabs/useRegisterValidationToTabs";
import FieldsetContext from "../../components/fieldset/__internal__/fieldset.context";

export interface CommonCheckableInputProps
  extends CommonHiddenCheckableInputProps {
  /** Unique identifier for the input. Will use a randomly generated GUID if none is provided. */
  id?: string;
  /** Content of the label. */
  label?: React.ReactNode;
  /** Additional hint text rendered below the label. */
  inputHint?: React.ReactNode;
  /** If true, the component will be disabled. */
  disabled?: boolean;
  /** Content to be rendered below the input when checked, is not supported when inputs are inline. */
  progressiveDisclosure?: React.ReactNode;
  /**
   * Id of the validation icon
   * @deprecated Validation icons with tooltips are no longer supported on this component.
   */
  validationIconId?: string;
}

export interface CheckableInputProps extends CommonCheckableInputProps {
  /** Element to be rendered as the visible input. */
  children?: React.ReactNode;
  /** HTML type attribute of the input. */
  type: string;
  /** Size of the component. */
  size?: "small" | "medium" | "large";
  /** Set error state - passed to Tabs context */
  error?: boolean;
  /** Set warning state - passed to Tabs context */
  warning?: boolean;
  /** Flag to display required asterisk. */
  showRequiredAsterisk?: boolean;
}

const CheckableInput = React.forwardRef(
  (
    {
      children,
      disabled,
      required,
      id: inputId,
      name,
      type,
      value,
      label,
      inputHint,
      checked,
      progressiveDisclosure,
      size = "medium",
      error,
      warning,
      showRequiredAsterisk,
      "aria-describedby": ariaDescribedBy,
      ...props
    }: CheckableInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { current: id } = useRef(inputId || guid());
    const inputHintId = inputHint ? `${id}-hint` : undefined;

    const { required: fieldsetRequired } = useContext(FieldsetContext);

    const combinedAriaDescribedBy = [inputHintId, ariaDescribedBy]
      .filter(Boolean)
      .join(" ");

    const accordionContainer = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState("0");
    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    useLayoutEffect(() => {
      if (accordionContainer.current) {
        const { scrollHeight } = accordionContainer.current;
        /* istanbul ignore next */
        const newHeight = checked && scrollHeight ? String(scrollHeight) : "0";
        setContentHeight(newHeight);
      }
    }, [checked]);

    useRegisterValidationToTabs(!!error, !!warning, id);

    return (
      <>
        <StyledCheckableInput>
          <StyledCheckableInputWrapper>
            <HiddenCheckableInput
              id={id}
              type={type}
              name={name}
              value={value}
              disabled={disabled}
              checked={checked}
              ref={ref}
              aria-describedby={combinedAriaDescribedBy}
              aria-invalid={error}
              required={fieldsetRequired || required}
              {...props}
            />
            {children}
          </StyledCheckableInputWrapper>
          {label && (
            <Label
              className="checkable-label"
              htmlFor={id}
              disabled={disabled}
              isRequired={required && showRequiredAsterisk}
              size={size}
            >
              {label}
            </Label>
          )}
          {inputHint && (
            <HintText
              className="checkable-hint-text"
              id={inputHintId}
              disabled={disabled}
              size={size}
            >
              {inputHint}
            </HintText>
          )}
        </StyledCheckableInput>
        {progressiveDisclosure && (
          <StyledAccordion
            data-role="progressive-disclosure-accordion"
            ref={accordionContainer}
            $expanded={checked}
            $contentHeight={contentHeight}
            $allowAnimation={allowMotion}
          >
            <StyledLineContainer $size={size}>
              <StyledAccordionLine $size={size} />
            </StyledLineContainer>
            <StyledAccordionContent>
              {progressiveDisclosure}
            </StyledAccordionContent>
          </StyledAccordion>
        )}
      </>
    );
  },
);

CheckableInput.displayName = "CheckableInput";

export default CheckableInput;
