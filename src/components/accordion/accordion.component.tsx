import React, { useRef, useState } from "react";
import { SpaceProps } from "styled-system";

import Box from "../box";
import Icon from "../icon";
import Typography from "../typography";
import createGuid from "../../__internal__/utils/helpers/guid";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import ValidationIcon from "../../__internal__/validations";

import {
  StyledContent,
  StyledDetails,
  StyledSummary,
  StyledWrapper,
  StyledSummaryTitleWrapper,
} from "./accordion.style";

interface AccordionProps extends SpaceProps, TagProps {
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
    const [currentState, setCurrentState] = useState(expanded || false);
    const guid = useRef(createGuid());
    const accordionId = id || `Accordion_${guid.current}`;
    const headerId = `AccordionHeader_${guid.current}`;
    const contentId = `AccordionContent_${guid.current}`;
    const getIconType = () =>
      size === "small" || variant === "subtle"
        ? "chevron_down_thick"
        : "chevron_down";
    const getTitle = () => (expanded ? openTitle || title : title);

    const showValidationIcon = !!(error || warning || info);

    return (
      <StyledWrapper
        borders={variant === "subtle" ? "none" : borders}
        data-element="accordion"
        id={accordionId}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCurrentState(!currentState);
            onChange?.(e, !currentState);
          }
        }}
        ref={ref}
        tabIndex={0}
        width={width}
        {...tagComponent("accordion", rest)}
      >
        <StyledDetails
          data-element="accordion-details"
          disableContentPadding={disableContentPadding}
          name={groupName}
          id={headerId}
          open={currentState}
        >
          <StyledSummary
            data-element="accordion-summary"
            {...headerSpacing}
            onClick={(e) => {
              e.preventDefault();
              setCurrentState(!currentState);
              onChange?.(e, !currentState);
            }}
            tabIndex={-1}
          >
            <StyledSummaryTitleWrapper
              alignItems="center"
              data-element="accordion-summary-title-wrapper"
              display="flex"
              flexDirection={iconAlign === "right" ? "row" : "row-reverse"}
              gap={2}
              justifyContent={
                iconAlign === "right" ? "space-between" : "flex-end"
              }
            >
              <Box display="flex" alignItems="center" flexDirection="row">
                {typeof title === "string" ? (
                  <Typography variant="h3">
                    {currentState ? openTitle || title : title}
                  </Typography>
                ) : (
                  getTitle()
                )}
                {showValidationIcon && (
                  <ValidationIcon
                    error={error}
                    warning={warning}
                    info={info}
                    tooltipPosition="top"
                    tabIndex={0}
                    ml={1}
                  />
                )}
              </Box>
              <Icon type={iconType || getIconType()} />
            </StyledSummaryTitleWrapper>
            {subTitle && (
              <Typography mt={1} mb={0} fontWeight="normal">
                {subTitle}
              </Typography>
            )}
          </StyledSummary>
        </StyledDetails>
        <StyledContent className="content" id={contentId}>
          {children}
        </StyledContent>
      </StyledWrapper>
    );
  },
);

export default Accordion;
