/**
 * Checkable Input Component
 *
 * @description Base component for Checkbox and RadioButton components.
 * Do not add props that are specific to either Checkbox or RadioButton.
 * Do not add props to the common interface that are not intended to be in the public interface of both components.
 * Styles of any children should be handled in their respective component files.
 */

import React, { useRef, useEffect, useContext, useLayoutEffect } from "react";
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
import Label from "../../label/label.component";
import HintText from "../../hint-text";
import useMediaQuery from "../../../hooks/useMediaQuery";

import { TabsContext } from "../../../components/tabs/__next__/tabs.context";
import { TabContext } from "../../../components/tabs/__next__/tab.context";
import type {
  TabContextProps,
  TabsContextProps,
} from "../../../components/tabs/__next__/tabs.types";

// TODO: Remove omitted prop from CommonHiddenCheckableInputProps when legacy props are removed
export interface CommonCheckableInputProps
  extends Omit<CommonHiddenCheckableInputProps, "validationIconId"> {
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
}

export interface CheckableInputProps extends CommonCheckableInputProps {
  /** Element to be rendered as the visible input. */
  children?: React.ReactNode;
  /** HTML type attribute of the input. */
  type: string;
  /** Value passed to the input. */
  value?: string;
  /** Size of the component. */
  size?: "small" | "medium" | "large";
  /** Set error state - passed to Tabs context */
  error?: boolean;
  /** Set warning state - passed to Tabs context */
  warning?: boolean;
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
      progressiveDisclosure,
      size = "medium",
      error,
      warning,
      ...props
    }: CheckableInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { current: id } = useRef(inputId || guid());
    const inputHintId = inputHint ? `${id}-hint` : undefined;

    const accordionContainer = useRef<HTMLDivElement>(null);
    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    const { scrollHeight } = accordionContainer.current || {};
    /* istanbul ignore next */
    const contentHeight = checked && scrollHeight ? String(scrollHeight) : "0";

    const { setErrors, setWarnings } =
      useContext<TabsContextProps>(TabsContext);
    const { tabId } = useContext<TabContextProps>(TabContext);
    const isMounted = useRef(false);

    useLayoutEffect(() => {
      isMounted.current = true;

      return () => {
        isMounted.current = false;
      };
    }, []);

    /* istanbul ignore next */
    useEffect(() => {
      if (setErrors) setErrors(id, tabId || "", !!error);
      if (setWarnings) setWarnings(id, tabId || "", !!warning);

      return () => {
        if (!isMounted.current) {
          if (setErrors) setErrors(id, tabId || "", false);
          if (setWarnings) setWarnings(id, tabId || "", false);
        }
      };
    }, [id, setErrors, setWarnings, error, warning, tabId]);

    return (
      <>
        <StyledCheckableInput $size={size}>
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
            <Label htmlFor={id} disabled={disabled} isLarge={size === "large"}>
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
