/**
 * Checkable Input Component
 *
 * Used as a base component for CheckBox and RadioButton components.
 * Do not add props here that are specific to either CheckBox or RadioButton.
 * Do not add props to the common interface that are not intended to be in the public interface of both components.
 * Styles of any children should be handled in their respective component files.
 */

import React, { useRef, useState, useEffect } from "react";
import useResizeObserver from "../../../hooks/__internal__/useResizeObserver";
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
} from "../hidden-checkable-input.component";
import guid from "../../utils/helpers/guid";
import { InputBehaviour } from "../../input-behaviour";
import Label from "../../label/label.component";
import HintText from "../../hint-text";
import useMediaQuery from "../../../hooks/useMediaQuery";

// TODO: Remove omitted props from CommonHiddenCheckableInputProps when legacy components are removed
export interface CommonCheckableInputProps
  extends Omit<
    CommonHiddenCheckableInputProps,
    "validationIconId" | "checked"
  > {
  /** Unique identifier for the input. Will use a randomly generated GUID if none is provided. */
  id?: string;
  /** Content of the label. */
  label?: React.ReactNode;
  /** Additional hint text rendered below the label. */
  inputHint?: string;
  /** If true, the component will be disabled. */
  disabled?: boolean;
  /** Content to be rendered below the input when checked, cannot be used when inputs are inline. */
  conditionalContent?: React.ReactNode;
}

export interface CheckableInputProps extends CommonCheckableInputProps {
  /** Element to be rendered as the visible input. */
  children?: React.ReactNode;
  /** HTML type attribute of the input. */
  type: string;
  /** Value passed to the input. */
  value?: string;
  /** Checked state of the input. */
  checked?: boolean;
  /** Size of the component. */
  size?: "small" | "medium" | "large";
}

const CheckableInput = React.forwardRef(
  (
    {
      children,
      disabled,
      id: inputId,
      name,
      type,
      value,
      label,
      inputHint,
      checked,
      conditionalContent,
      size = "medium",
      ...props
    }: CheckableInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { current: id } = useRef(inputId || guid());
    const inputHintId = inputHint ? `${id}-hint` : undefined;

    const accordionContainer = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<string | number>(0);
    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    useResizeObserver(accordionContainer, () => {
      setContentHeight(accordionContainer.current?.scrollHeight as number);
    });

    useEffect(() => {
      setContentHeight(accordionContainer.current?.scrollHeight as number);
    }, [checked]);

    return (
      <>
        <StyledCheckableInput disabled={disabled} size={size}>
          <InputBehaviour>
            <StyledCheckableInputWrapper>
              <HiddenCheckableInput
                id={id}
                type={type}
                name={name}
                value={value}
                disabled={disabled}
                checked={checked}
                ref={ref}
                ariaDescribedBy={inputHintId}
                {...props}
              />
              {children}
            </StyledCheckableInputWrapper>
            {label && (
              <Label
                htmlFor={id}
                disabled={disabled}
                isLarge={size === "large"}
              >
                {label}
              </Label>
            )}
            {inputHint && (
              <HintText
                id={inputHintId}
                marginBottom="0"
                isDisabled={disabled}
                isLarge={size === "large"}
              >
                {inputHint}
              </HintText>
            )}
          </InputBehaviour>
        </StyledCheckableInput>
        {conditionalContent && (
          <StyledAccordion
            data-role="conditional-content-accordion"
            ref={accordionContainer}
            expanded={checked}
            contentHeight={contentHeight}
            allowAnimation={allowMotion}
          >
            <StyledLineContainer size={size}>
              <StyledAccordionLine size={size} />
            </StyledLineContainer>
            <StyledAccordionContent size={size}>
              {conditionalContent}
            </StyledAccordionContent>
          </StyledAccordion>
        )}
      </>
    );
  },
);

CheckableInput.displayName = "CheckableInput";

export default CheckableInput;
