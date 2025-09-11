import React, { useContext, useEffect, useState, useRef } from "react";
import { MarginProps } from "styled-system";

import {
  StyledFieldset,
  StyledLegend,
  StyledIconWrapper,
  StyledLegendProps,
} from "./fieldset.style";
import ValidationIcon from "../validations/validation-icon.component";
import NewValidationContext from "../../components/carbon-provider/__internal__/new-validation.context";
import { InputGroupBehaviour, InputGroupContext } from "../input-behaviour";
import Help from "../../components/help";
import Typography from "../../components/typography";
import Box from "../../components/box";
import ErrorBorder from "../../components/textbox/textbox.style";
import ValidationMessage from "../validation-message";
import HintText from "../hint-text";
import FieldHelp from "../field-help";
import guid from "../utils/helpers/guid";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";
import { filterStyledSystemMarginProps } from "../../style/utils";

export interface FieldsetProps extends MarginProps {
  /** Role */
  role?: string;
  /** Fieldset content */
  children: React.ReactNode;
  /** The content for the Fieldset Legend */
  legend?: string;
  /* Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error?: boolean | string;
  /* Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning?: boolean | string;
  /* Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info?: boolean | string;
  /** When true, legend is placed in line with the children */
  inline?: boolean;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** If true, an asterisk will be added to the label */
  isRequired?: boolean;
  /** Controls whether group behaviour should be enabled */
  blockGroupBehaviour?: boolean;
  /** Margin props for the legend element */
  legendMargin?: Pick<MarginProps, "mb">;
  /** Any valid CSS string to set the component's width */
  width?: string;
  /** Apply disabled styling to the legend content */
  isDisabled?: boolean;
  /** Set a name value on the component */
  name?: string;
  /** Set an id value on the component */
  id?: string;
  /** Content for the Help tooltip */
  labelHelp?: React.ReactNode;
  /** Content for the fieldHelp */
  fieldHelp?: React.ReactNode;
  /** Content for an additional hint text below the legend */
  inputHint?: React.ReactNode;
  /** Specifies whether the validation message should be displayed above the input */
  validationMessagePositionTop?: boolean;
  /** Apply new validation styles */
  applyNewValidation?: boolean;
}

const Fieldset = ({
  legend,
  children,
  inline = false,
  legendWidth,
  legendAlign,
  legendSpacing = 2,
  error,
  warning,
  info,
  isRequired,
  blockGroupBehaviour,
  legendMargin = {},
  isDisabled,
  labelHelp,
  fieldHelp,
  inputHint,
  validationMessagePositionTop,
  applyNewValidation = false,
  id,
  ...rest
}: FieldsetProps) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const marginProps = filterStyledSystemMarginProps(rest);
  const [ref, setRef] = useState<HTMLFieldSetElement | null>(null);
  const [isFocused, setFocus] = useState(false);

  const internalId = useRef(guid());
  const uniqueId = id || internalId.current;
  const inputHintId = inputHint ? `${uniqueId}-hint` : undefined;

  useEffect(() => {
    if (ref && isRequired) {
      Array.from(
        ref.querySelectorAll("input") || /* istanbul ignore next */ [],
      ).forEach((el) => {
        el.setAttribute("required", "");
      });
    }
  }, [ref, isRequired]);

  const tooltipIcon = () => {
    if (error || warning || info) {
      return (
        <StyledIconWrapper aria-hidden="true">
          <ValidationIcon
            error={error}
            warning={warning}
            info={info}
            tooltipFlipOverrides={["top", "bottom"]}
          />
        </StyledIconWrapper>
      );
    }

    const helpProps = {
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
    };

    if (labelHelp) {
      return (
        <StyledIconWrapper {...helpProps}>
          <Help isFocused={isFocused}>{labelHelp}</Help>
        </StyledIconWrapper>
      );
    }

    return null;
  };

  let legendAlignment: StyledLegendProps["align"];
  if (inline && !legendAlign) {
    legendAlignment = "right";
  } else if (!legendAlign) {
    legendAlignment = "left";
  } else {
    legendAlignment = legendAlign;
  }

  // this can be removed once we remove legacy validation and fieldHelp
  // as we only need to combine validationId and inputHintId
  const { validationId, fieldHelpId, ariaDescribedBy } = useInputAccessibility({
    id: uniqueId,
    validationRedesignOptIn: true,
    error,
    warning,
    info,
    fieldHelp,
  });

  const describedByArray = validationMessagePositionTop
    ? [ariaDescribedBy, inputHintId]
    : [inputHintId, ariaDescribedBy];
  const combinedAriaDescribedBy = describedByArray.filter(Boolean).join(" ");

  const validationMessage = () => {
    if (error || warning) {
      return (
        <>
          <ValidationMessage
            error={error}
            warning={warning}
            validationId={validationId}
            validationMessagePositionTop={validationMessagePositionTop}
          />
          <ErrorBorder warning={!!(!error && warning)} />
        </>
      );
    }
    return null;
  };

  if (applyNewValidation) {
    return (
      <StyledFieldset
        ref={setRef}
        data-component="fieldset"
        id={uniqueId}
        aria-describedby={combinedAriaDescribedBy || undefined}
        {...rest}
        {...marginProps}
      >
        {legend && (
          <StyledLegend
            align={legendAlignment}
            isRequired={isRequired}
            isDisabled={isDisabled}
            data-element="legend"
            data-role="legend"
          >
            {legend}
          </StyledLegend>
        )}

        {inputHint && (
          <HintText
            id={inputHintId}
            isDisabled={isDisabled}
            align={legendAlignment}
          >
            {inputHint}
          </HintText>
        )}

        <Box position="relative" mt={1}>
          {validationMessagePositionTop && validationMessage()}
          {children}
          {!validationMessagePositionTop && validationMessage()}
        </Box>
      </StyledFieldset>
    );
  }

  return (
    <InputGroupBehaviour blockGroupBehaviour={blockGroupBehaviour}>
      <StyledFieldset
        ref={setRef}
        data-component="fieldset"
        id={uniqueId}
        aria-describedby={ariaDescribedBy || undefined}
        {...rest}
        {...marginProps}
      >
        {legend && (
          <InputGroupContext.Consumer>
            {({ onMouseEnter, onMouseLeave }) => (
              <StyledLegend
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                inline={inline}
                width={legendWidth}
                align={legendAlignment}
                rightPadding={legendSpacing}
                {...legendMargin}
                data-element="legend"
                data-role="legend"
                isRequired={isRequired}
                isDisabled={isDisabled}
              >
                {legend}
                {!validationRedesignOptIn && tooltipIcon()}
              </StyledLegend>
            )}
          </InputGroupContext.Consumer>
        )}
        {!validationRedesignOptIn && (
          <Typography screenReaderOnly id={validationId}>
            {error || warning || info}
          </Typography>
        )}
        <Box display="flex" flexDirection="column" mt={inline ? 0 : 1}>
          {children}
          {fieldHelp && <FieldHelp id={fieldHelpId}>{fieldHelp}</FieldHelp>}
        </Box>
      </StyledFieldset>
    </InputGroupBehaviour>
  );
};

export default Fieldset;
