import React, { useRef, useState } from "react";
import { SpaceProps } from "styled-system";

import Box from "../box";
import Typography from "../typography";
import useMediaQuery from "../../hooks/useMediaQuery";
import createGuid from "../../__internal__/utils/helpers/guid";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import ValidationIcon from "../../__internal__/validations";

import {
  StyledContent,
  StyledDetails,
  StyledSummary,
  StyledWrapper,
  StyledSummaryTitle,
  StyledSummaryTitleWrapper,
  StyledIcon,
} from "./accordion.style";

export interface AccordionProps extends SpaceProps, TagProps {
  /** Toggles left and right borders, set to none when variant is subtle */
  borders?: "default" | "full" | "none";
  children?: React.ReactNode;
  /** Disable padding for the content */
  disableContentPadding?: boolean;
  /** An error message to be displayed in the tooltip */
  error?: string;
  /** Sets default expanded state */
  expanded?: boolean;
  /** Specifies a group name — give multiple accordions the same name value to group them. Only one of the group can be open at a time — opening one will cause the others to close */
  groupName?: string;
  /** Styled system spacing props provided to Accordion Title */
  headerSpacing?: SpaceProps;
  /** Sets icon alignment */
  iconAlign?: "left" | "right";
  /** Sets icon type */
  iconType?: "chevron_down" | "chevron_down_thick" | "dropdown";
  /** The ID for this accordion */
  id?: string;
  /** An info message to be displayed in the tooltip */
  info?: string;
  /** Callback fired when expansion state changes */
  onChange?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean,
  ) => void;
  /** When the Accordion is open the title can change to this */
  openTitle?: string;
  /** Sets accordion size */
  size?: "large" | "small";
  /** Sets accordion sub title */
  subTitle?: string;
  /** Sets accordion title */
  title: React.ReactNode;
  /** Sets accordion variant */
  variant?: "standard" | "subtle";
  /** A warning message to be displayed in the tooltip */
  warning?: string;
  /** Sets accordion width */
  width?: string;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      borders = "default",
      children,
      disableContentPadding = false,
      error,
      expanded,
      groupName,
      headerSpacing,
      iconAlign = "right",
      iconType,
      id,
      info,
      onChange,
      openTitle,
      size = "large",
      subTitle,
      title,
      variant = "standard",
      warning,
      width,
      ...rest
    }: AccordionProps,
    ref,
  ) => {
    const reduceMotion = !useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );
    const contentRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const guid = useRef(createGuid());

    const [currentState, setCurrentState] = useState(expanded || false);

    const accordionId = id || `Accordion_${guid.current}`;
    const headerId = `AccordionHeader_${guid.current}`;
    const contentId = `AccordionContent_${guid.current}`;
    const showValidationIcon = !!(error || warning || info);

    const getIconType = () =>
      size === "small" || variant === "subtle"
        ? "chevron_down_thick"
        : "chevron_down";

    const getTitle = () => (expanded ? openTitle || title : title);

    const getIconAlignment = () => {
      if (variant === "subtle") {
        return "left";
      }

      return iconAlign;
    };

    return (
      <StyledWrapper
        borders={variant === "subtle" ? "none" : borders}
        data-element="accordion"
        data-role="accordion-wrapper"
        expanded={currentState}
        headerSpacing={headerSpacing}
        id={accordionId}
        onKeyDown={(e) => {
          /* istanbul ignore else */
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCurrentState(!currentState);
            onChange?.(e, !currentState);
          }
        }}
        ref={ref}
        size={size}
        subTitle={subTitle}
        width={width}
        variant={variant}
        {...rest}
        {...tagComponent("accordion", rest)}
      >
        <StyledDetails
          aria-controls={contentId}
          aria-expanded={currentState}
          data-element="accordion-details"
          data-role="accordion-details"
          disableContentPadding={disableContentPadding}
          iconAlign={getIconAlignment()}
          id={headerId}
          name={groupName}
          open={currentState}
          reduceMotion={reduceMotion}
          ref={detailsRef}
          size={size}
          tabIndex={0}
          variant={variant}
        >
          <StyledSummary
            data-element="accordion-summary"
            data-role="accordion-summary"
            onClick={(e) => {
              e.preventDefault();

              /* istanbul ignore else */
              if (detailsRef.current) {
                detailsRef.current.focus();
              }

              setCurrentState(!currentState);
              onChange?.(e, !currentState);
            }}
            tabIndex={-1}
            {...headerSpacing}
          >
            <StyledSummaryTitleWrapper
              alignItems="center"
              color={
                variant === "subtle" ? "var(--colorsActionMajor500)" : undefined
              }
              data-element="accordion-summary-title-wrapper"
              data-role="accordion-summary-title-wrapper"
              display="flex"
              flexDirection={
                getIconAlignment() === "right" ? "row" : "row-reverse"
              }
              gap={variant === "subtle" ? 1 : 2}
              justifyContent={
                getIconAlignment() === "right" ? "space-between" : "flex-end"
              }
              size={size}
              variant={variant}
            >
              <Box
                alignItems="center"
                data-element="accordion-title-content"
                data-role="accordion-title-content"
                display="flex"
                flexDirection="row"
              >
                <Box>
                  {typeof title === "string" ? (
                    <StyledSummaryTitle
                      data-element="accordion-title"
                      data-role="accordion-title"
                      size={size}
                      variant={variant}
                    >
                      {currentState ? openTitle || title : title}
                    </StyledSummaryTitle>
                  ) : (
                    getTitle()
                  )}
                  {subTitle && size !== "small" && variant !== "subtle" && (
                    <Typography
                      data-element="accordion-subtitle"
                      data-role="accordion-subtitle"
                      fontWeight="normal"
                      mb={0}
                      mt={1}
                    >
                      {subTitle}
                    </Typography>
                  )}
                </Box>
                {showValidationIcon && (
                  <ValidationIcon
                    error={error}
                    info={info}
                    ml={1}
                    tabIndex={0}
                    tooltipPosition="top"
                    warning={warning}
                  />
                )}
              </Box>
              <StyledIcon
                data-element="accordion-marker"
                data-role="accordion-marker"
                type={iconType || getIconType()}
                variant={variant}
              />
            </StyledSummaryTitleWrapper>
          </StyledSummary>
        </StyledDetails>

        <StyledContent
          aria-labelledby={headerId}
          className="content"
          data-element="accordion-content"
          data-role="accordion-content"
          expanded={currentState}
          id={contentId}
          reduceMotion={reduceMotion}
          ref={contentRef}
          variant={variant}
        >
          {children}
        </StyledContent>
      </StyledWrapper>
    );
  },
);

Accordion.displayName = "Accordion";
export default Accordion;
