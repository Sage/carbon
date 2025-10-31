import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import {
  StyledFieldset,
  StyledLegend,
  StyledFieldsetContentWrapper,
  StyledFieldsetContent,
} from "./fieldset.style";
import ErrorBorder from "../../../components/textbox/textbox.style";
import ValidationMessage from "../../validation-message";
import HintText from "../../hint-text";
import guid from "../../utils/helpers/guid";
import { filterStyledSystemMarginProps } from "../../../style/utils";

export interface FieldsetProps extends MarginProps {
  /** Inputs rendered within the fieldset. */
  children: React.ReactNode;
  /** Set a name value on the fieldset. */
  name?: string;
  /** Set an id value on the fieldset. */
  id?: string;
  /** The content for the fieldset legend. */
  legend?: string;
  /** Content for an additional hint text below the legend */
  legendHint?: React.ReactNode;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Error message to be displayed when validation fails */
  error?: string;
  /** Warning message to be displayed when validation warning occurs */
  warning?: string;
  /** If true, an asterisk will be added to the label */
  isRequired?: boolean;
  /** Apply disabled styling to the component */
  isDisabled?: boolean;
  /** Specifies whether the validation message should be displayed above the input */
  validationMessagePositionTop?: boolean;
  /** Set the size of the component */
  size?: "small" | "medium" | "large";
  /** When true, children are inline */
  inline?: boolean;
}

const Fieldset = ({
  children,
  name,
  id,
  legend,
  legendAlign,
  legendHint,
  error,
  warning,
  isRequired,
  isDisabled,
  validationMessagePositionTop,
  size = "medium",
  inline = false,
  ...rest
}: FieldsetProps) => {
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;

  const legendHintId = legendHint ? `${uniqueId}-hint` : undefined;
  const validationId = (error || warning) && `${uniqueId}-validation-message`;

  const ariaDescribedBy = [legendHintId, validationId]
    .filter(Boolean)
    .join(" ");

  const validationMessage = () => {
    if (error || warning) {
      return (
        <>
          <ValidationMessage
            error={error}
            warning={warning}
            validationId={validationId}
            isLarge={size === "large"}
          />
          <ErrorBorder warning={!!(!error && warning)} />
        </>
      );
    }
    return null;
  };

  return (
    <StyledFieldset
      data-component="fieldset"
      id={uniqueId}
      name={name}
      aria-describedby={ariaDescribedBy}
      validationMessagePositionTop={validationMessagePositionTop}
      size={size}
      {...filterStyledSystemMarginProps(rest)}
      {...rest}
    >
      {legend && (
        <StyledLegend
          align={legendAlign}
          isRequired={isRequired}
          isDisabled={isDisabled}
          data-element="legend"
          data-role="legend"
          isLarge={size === "large"}
        >
          {legend}
        </StyledLegend>
      )}

      {legendHint && (
        <HintText
          id={legendHintId}
          isDisabled={isDisabled}
          align={legendAlign}
          isLarge={size === "large"}
          marginBottom="0"
        >
          {legendHint}
        </HintText>
      )}

      <StyledFieldsetContentWrapper
        validationMessagePositionTop={validationMessagePositionTop}
        size={size}
      >
        {validationMessagePositionTop && validationMessage()}
        <StyledFieldsetContent
          data-role="fieldset-content"
          inline={inline}
          size={size}
        >
          {children}
        </StyledFieldsetContent>
        {!validationMessagePositionTop && validationMessage()}
      </StyledFieldsetContentWrapper>
    </StyledFieldset>
  );
};

export default Fieldset;
