import React, { useRef } from "react";
import Label from "../../__internal__/label";
import StyledInlineInputs, {
  StyledContentContainer,
  StyledInlineInput,
  StyledContentContainerProps,
  StyledInlineInputsProps,
} from "./inline-inputs.style";

import createGuid from "../../__internal__/utils/helpers/guid";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";

interface InlineInputsContextProps {
  ariaLabelledBy?: string;
}

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
  extends StyledContentContainerProps,
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
  /** Flag to configure component as mandatory. */
  required?: boolean;
}

export const InlineInputsContext: React.Context<InlineInputsContextProps> = React.createContext(
  {}
);

const columnWrapper = (
  children: React.ReactNode,
  gutter: GutterOptions,
  labelId?: string
) => {
  return React.Children.map(children, (input) => {
    return (
      <InlineInputsContext.Provider value={{ ariaLabelledBy: labelId }}>
        <StyledInlineInput gutter={gutter} data-element="inline-input">
          {input}
        </StyledInlineInput>
      </InlineInputsContext.Provider>
    );
  });
};

const InlineInputs = ({
  adaptiveLabelBreakpoint,
  label,
  htmlFor,
  children = null,
  className = "",
  gutter = "none",
  inputWidth,
  labelInline = true,
  labelWidth,
  required,
}: InlineInputsProps) => {
  const labelId = useRef(createGuid());
  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  let inlineLabel: boolean | undefined = labelInline;
  if (adaptiveLabelBreakpoint) {
    inlineLabel = largeScreen;
  }

  function renderLabel() {
    if (!label) return null;

    return (
      <Label
        labelId={labelId.current}
        inline={inlineLabel}
        htmlFor={htmlFor}
        isRequired={required}
      >
        {label}
      </Label>
    );
  }

  return (
    <StyledInlineInputs
      gutter={gutter}
      data-component="inline-inputs"
      className={className}
      labelWidth={labelWidth}
      labelInline={inlineLabel}
    >
      {renderLabel()}
      <StyledContentContainer
        gutter={gutter}
        data-element="inline-inputs-container"
        inputWidth={inputWidth}
      >
        {columnWrapper(children, gutter, label ? labelId.current : undefined)}
      </StyledContentContainer>
    </StyledInlineInputs>
  );
};

InlineInputs.displayName = "InlineInputs";

export default InlineInputs;
