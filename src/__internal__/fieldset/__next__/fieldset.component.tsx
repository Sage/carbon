/**
 * Internal Fieldset component used as base for any grouped inputs.
 *
 * @description Renders a fieldset element with an optional legend and hint text, and handles
 * the display of validation messages for grouped inputs.
 */

import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import {
  StyledFieldset,
  StyledLegend,
  StyledFieldsetContentWrapper,
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
  /** Text alignment of the legend */
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
      $validationMessagePositionTop={validationMessagePositionTop}
      $size={size}
      {...filterStyledSystemMarginProps(rest)}
      {...rest}
    >
      {legend && (
        <StyledLegend
          data-element="legend"
          $align={legendAlign}
          $isRequired={isRequired}
          $isDisabled={isDisabled}
          $isLarge={size === "large"}
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

      <StyledFieldsetContentWrapper $size={size}>
        {validationMessagePositionTop && validationMessage()}
        {children}
        {!validationMessagePositionTop && validationMessage()}
      </StyledFieldsetContentWrapper>
    </StyledFieldset>
  );
};

export default Fieldset;
