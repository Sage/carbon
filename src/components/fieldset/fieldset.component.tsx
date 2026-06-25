import React, { useRef } from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import {
  StyledFieldset,
  StyledLegend,
  StyledFieldsetContentWrapper,
  StyledFieldsetContent,
} from "./fieldset.style";
import FieldsetContext from "./__internal__/fieldset.context";
import ErrorBorder from "../../__internal__/error-border/error-border.style";
import ValidationMessage from "../../__internal__/validation-message/__next__";
import HintText from "../../__internal__/hint-text";
import guid from "../../__internal__/utils/helpers/guid";
import useRegisterValidationToTabs from "../../hooks/__internal__/useRegisterValidationToTabs/useRegisterValidationToTabs";
import { filterStyledSystemMarginProps } from "../../style/utils";

export interface FieldsetProps extends MarginProps, TagProps {
  /** Inputs rendered within the fieldset. */
  children?: React.ReactNode;
  /** Set an id value on the fieldset. */
  id?: string;
  /** The content for the fieldset legend. */
  legend?: string;
  /** Content for an additional hint text below the legend. */
  legendHint?: string;
  /** Set the label weight of the children input's label. */
  labelWeight?: "regular" | "bold";
  /** Error message to be displayed when validation fails. */
  error?: string;
  /** Warning message to be displayed when validation warning occurs. */
  warning?: string;
  /** If true, an asterisk will be added to the legend and all inputs within the fieldset will be required. */
  required?: boolean;
  /** Specifies whether the validation message should be displayed above the input. */
  validationMessagePositionTop?: boolean;
  /** Set the size of the component. */
  size?: "small" | "medium" | "large";
  /** Set the orientation of the fieldset's children. */
  orientation?: "horizontal" | "vertical";
}

const Fieldset = ({
  children,
  id,
  legend,
  legendHint,
  labelWeight = "regular",
  error,
  warning,
  required,
  validationMessagePositionTop = true,
  size = "medium",
  orientation = "vertical",
  ...rest
}: FieldsetProps) => {
  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;

  const legendHintId = legendHint ? `${uniqueId}-hint` : undefined;
  const validationId = (error || warning) && `${uniqueId}-validation-message`;

  useRegisterValidationToTabs(!!error, !!warning, uniqueId);

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
            id={validationId}
            size={size}
          />
          <ErrorBorder $warning={!!(!error && warning)} />
        </>
      );
    }
    return null;
  };

  return (
    <StyledFieldset
      id={uniqueId}
      aria-describedby={ariaDescribedBy}
      {...rest}
      {...filterStyledSystemMarginProps(rest)}
      {...tagComponent("fieldset", rest)}
    >
      {legend && (
        <StyledLegend
          $isRequired={required}
          data-element="legend"
          data-role="legend"
          $size={size}
        >
          {legend}
        </StyledLegend>
      )}
      {legendHint && (
        <HintText id={legendHintId} size={size}>
          {legendHint}
        </HintText>
      )}
      <StyledFieldsetContentWrapper
        $size={size}
        $hasLegend={!!(legend || legendHint)}
      >
        {validationMessagePositionTop && validationMessage()}
        <StyledFieldsetContent
          data-role="fieldset-content"
          className="fieldset-content"
          $orientation={orientation}
          $size={size}
          $labelWeight={labelWeight}
        >
          <FieldsetContext.Provider
            value={{ size, hasError: !!error, required }}
          >
            {children}
          </FieldsetContext.Provider>
        </StyledFieldsetContent>
        {!validationMessagePositionTop && validationMessage()}
      </StyledFieldsetContentWrapper>
    </StyledFieldset>
  );
};

export default Fieldset;
