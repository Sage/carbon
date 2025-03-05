import React, { useRef, useEffect } from "react";
import { MarginProps } from "styled-system";
import Label from "../../__internal__/label";
import StyledInlineInputs, {
  StyledContentContainer,
  StyledInlineInput,
  StyledContentContainerProps,
  StyledInlineInputsProps,
} from "./inline-inputs.style";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";

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
    StyledInlineInputsProps,
    TagProps {
  /** Breakpoint for adaptive label (inline label change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Children elements */
  children?: React.ReactNode;
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** The id of the corresponding input control for the label */
  htmlFor?: string;
  /** Defines the label text for the heading. */
  label?: string;
  /** Inline label alignment */
  labelAlign?: "left" | "right";
  /**
   * Custom label id, could be used in combination with aria-labelledby prop of each input,
   * to make them accessible for screen readers.
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

  const marginProps = filterStyledSystemMarginProps(rest);

  useEffect(() => {
    if (required) {
      const elements = Array.from(
        ref.current?.querySelectorAll("input") || /* istanbul ignore next */ [],
      );
      elements.forEach((el) => el.setAttribute("required", ""));
    }
  }, [required]);

  return (
    <StyledInlineInputs
      gutter={gutter}
      labelWidth={labelWidth}
      labelInline={inlineLabel}
      ref={ref}
      {...marginProps}
      {...tagComponent("inline-inputs", rest)}
    >
      {renderLabel()}
      <StyledContentContainer
        gutter={gutter}
        data-element="inline-inputs-container"
        data-role="inline-inputs-container"
        inputWidth={inputWidth}
      >
        {columnWrapper(children, gutter)}
      </StyledContentContainer>
    </StyledInlineInputs>
  );
};

InlineInputs.displayName = "InlineInputs";

export default InlineInputs;
