import React, { useRef, useEffect } from "react";
import { MarginProps } from "styled-system";
import Label from "../../__internal__/label";
import StyledInlineInputs, {
  StyledContentContainer,
  StyledInlineInput,
  StyledContentContainerProps,
  StyledInlineInputsProps,
} from "./inline-inputs.style";
import FormSpacingProvider from "../../__internal__/form-spacing-provider";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";

type GutterOptions =
  | "none"
  | "extra-small"
  | "small"
  | "medium-small"
  | "medium"
  | "medium-large"
  | "large"
  | "extra-large";

export interface InlineInputsProps
  extends MarginProps,
    StyledContentContainerProps,
    StyledInlineInputsProps {
  /** Breakpoint for adaptive label (inline label change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Children elements */
  children?: React.ReactNode;
  /** [Legacy prop] A custom class name for the component. */
  className?: string;
  /** The id of the corresponding input control for the label */
  htmlFor?: string;
  /** Defines the label text for the heading. */
  label?: string;
  /** Inline label alignment */
  labelAlign?: "left" | "right";
  /**
   * Custom label id, could be used in combination with aria-labelledby prop of each input,
   * to make them accesible for screen readers.
   */
  labelId?: string;
  /** Flag to configure component as mandatory. */
  required?: boolean;
  /** Flag to configure component as optional. */
  isOptional?: boolean;
}

const columnWrapper = (children: React.ReactNode, gutter: GutterOptions) => {
  return React.Children.map(children, (input) => {
    return (
      <StyledInlineInput gutter={gutter} data-element="inline-input">
        {input}
      </StyledInlineInput>
    );
  });
};

const InlineInputs = ({
  adaptiveLabelBreakpoint,
  label,
  labelAlign,
  labelId,
  htmlFor,
  children = null,
  className = "",
  gutter = "none",
  inputWidth,
  labelInline = true,
  labelWidth,
  required,
  isOptional,
  ...rest
}: InlineInputsProps) => {
  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  const ref = useRef<HTMLDivElement>(null);
  let inlineLabel: boolean | undefined = labelInline;
  if (adaptiveLabelBreakpoint) {
    inlineLabel = largeScreen;
  }

  function renderLabel() {
    if (!label) return null;

    return (
      <Label
        align={labelAlign}
        labelId={labelId}
        inline={inlineLabel}
        htmlFor={htmlFor}
        isRequired={required}
        optional={isOptional}
      >
        {label}
      </Label>
    );
  }

  const marginProps = useFormSpacing(rest);

  useEffect(() => {
    if (required) {
      const elements = Array.from(
        ref.current?.querySelectorAll("input") || /* istanbul ignore next */ []
      );
      elements.forEach((el) => el.setAttribute("required", ""));
    }
  }, [required]);

  return (
    <StyledInlineInputs
      gutter={gutter}
      data-component="inline-inputs"
      className={className}
      labelWidth={labelWidth}
      labelInline={inlineLabel}
      ref={ref}
      {...marginProps}
    >
      {renderLabel()}
      <StyledContentContainer
        gutter={gutter}
        data-element="inline-inputs-container"
        inputWidth={inputWidth}
      >
        <FormSpacingProvider marginBottom={undefined}>
          {columnWrapper(children, gutter)}
        </FormSpacingProvider>
      </StyledContentContainer>
    </StyledInlineInputs>
  );
};

InlineInputs.displayName = "InlineInputs";

export default InlineInputs;
