import React, { useRef } from "react";
import Label from "../../__internal__/label";
import StyledInlineInputs, {
  StyledContentContainer,
  StyledInlineInput,
} from "./inline-inputs.style";
import createGuid from "../../__internal__/utils/helpers/guid";

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

export interface InlineInputsProps {
  /** Children elements */
  children?: React.ReactNode;
  /** [Legacy prop] A custom class name for the component. */
  className?: string;
  /** Gutter prop gets passed down to Row component if false gutter value is "none" */
  gutter?: GutterOptions;
  /** The id of the corresponding input control for the label */
  htmlFor?: string;
  /** Width of the inline inputs container in percentage */
  inputWidth?: number;
  /** Defines the label text for the heading. */
  label?: string;
  /** Width of a label in percentage */
  labelWidth?: number;
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
  label,
  htmlFor,
  children = null,
  className = "",
  gutter = "none",
  inputWidth,
  labelWidth,
}: InlineInputsProps) => {
  const labelId = useRef(createGuid());

  function renderLabel() {
    if (!label) return null;

    return (
      <Label labelId={labelId.current} inline htmlFor={htmlFor}>
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
